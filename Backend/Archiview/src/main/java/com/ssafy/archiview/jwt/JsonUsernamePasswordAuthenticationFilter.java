package com.####.archiview.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.####.archiview.dto.token.TokenDto;
import com.####.archiview.dto.user.CustomUserDetails;
import com.####.archiview.dto.user.UserDto;
import com.####.archiview.entity.Role;
import com.####.archiview.entity.User;
import com.####.archiview.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Iterator;
import java.util.Optional;

public class JsonUsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private final jwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    private static final String DEFAULT_LOGIN_REQUEST_URL = "/api/users/login";  // /api/users/login으로 오는 요청을 처리
    private static final String HTTP_METHOD = "POST";    //HTTP 메서드의 방식은 POST
    private static final String CONTENT_TYPE = "application/json";//json 타입의 데이터로만 로그인을 진행
    private static final AntPathRequestMatcher DEFAULT_LOGIN_PATH_REQUEST_MATCHER =
            new AntPathRequestMatcher(DEFAULT_LOGIN_REQUEST_URL, HTTP_METHOD); //=>   /login의 요청에, POST로 온 요청에 매칭된다.

    private final ObjectMapper objectMapper;
    @Autowired
    public JsonUsernamePasswordAuthenticationFilter(ObjectMapper objectMapper, jwtUtil jwtUtil /* ,
                                                    AuthenticationSuccessHandler authenticationSuccessHandler, // 로그인 성공 시 처리할 핸들러
                                                    AuthenticationFailureHandler authenticationFailureHandler // 로그인 실패 시 처리할 핸들러 */
    ) {

        super(DEFAULT_LOGIN_PATH_REQUEST_MATCHER);   // 위에서 설정한 /api/users/login의 요청에, GET으로 온 요청을 처리하기 위해 설정한다.
        this.objectMapper = objectMapper;
        this.jwtUtil = jwtUtil;
//        setAuthenticationFailureHandler(authenticationFailureHandler);
//        setAuthenticationSuccessHandler(authenticationSuccessHandler);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException {
        // 1. username, password를 받아서
        // 2. 정상인지 로그인을 시도해본다. authenticationManager로 로그인을 시도하면
        // PrincipalDetailsService의 loadUserByUsername()가 실행됨
        // 3. PrincipalDetails를 세션에 담고 (권한 관리를 위해서)
        // 4. JWT토큰을 만들어서 응답
        if (request.getContentType() == null || !request.getContentType().equals(CONTENT_TYPE)) {
            throw new AuthenticationServiceException("Authentication Content-Type not supported: " + request.getContentType());
        }
        // json 형태로 데이터를 받음
        LoginDto loginDto = objectMapper.readValue(StreamUtils.copyToString(request.getInputStream(), StandardCharsets.UTF_8), LoginDto.class);
        String id = loginDto.getId();
        String pw = loginDto.getPw();

        if (id == null || pw == null) {
            throw new AuthenticationServiceException("DATA IS MISS");
        }

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(id, pw);

        // PrincipalDetailsService의 loadUserByUsername() 메서드가 실행된 후
        // 정상처리 되면 authentication이 리턴 됨
        Authentication authentication = getAuthenticationManager().authenticate(authRequest);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        setDetails(request, authRequest);
        return authentication;
    }

    protected void setDetails(HttpServletRequest request, UsernamePasswordAuthenticationToken authRequest) {
        authRequest.setDetails(this.authenticationDetailsSource.buildDetails(request));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException {
        System.out.println("login success");
        //UserDetails
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String userId = customUserDetails.getUsername();  // userId 추출

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String userRole = auth.getAuthority();  // role 추출

        TokenDto token = jwtUtil.createJwt(userId, userRole);  // 토큰 생성
        Role role = null;
        if(userRole.equals("USER")) {
            role = Role.USER;
        } else {
            role = Role.MEMBER;
        }

        Optional<User> user = userRepository.findById(userId);

        UserDto.loginResponseDto responseDto = UserDto.loginResponseDto.builder()
                .accessToken(token.getAccessToken())
                .refreshToken(token.getRefreshToken())
                .id(userId)
                .name(user.get().getName())
                .email(user.get().getEmail())
                .profileUrl(user.get().getProfileUrl())
                .role(role)
                .build();
        user.get().updateRefreshToken(token.getRefreshToken());
        userRepository.save(user.get());  // 발급받은 refreshToken을 DB에 저장

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.OK.value());
        response.getWriter().write(new ObjectMapper().writeValueAsString(responseDto));
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        System.out.println("login failed");
        response.setStatus(401);
    }
    @Data
    private static class LoginDto {
        String id;  // request key (username -> id)
        String pw;  // request key (password -> pw)
    }
}