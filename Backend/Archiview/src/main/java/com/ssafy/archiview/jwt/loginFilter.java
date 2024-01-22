//package com.####.archiview.jwt;
//
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.####.archiview.dto.user.CustomUserDetails;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import java.io.IOException;
//import java.util.Collection;
//import java.util.Iterator;
//
//// 로그인 요청 시 요청을 가로채서 검증을 진행하는 spring security 필터 클래스
////@RequiredArgsConstructor
//public class loginFilter extends UsernamePasswordAuthenticationFilter {
//    private final AuthenticationManager authenticationManager;
//    private final jwtUtil jwtUtil;
//    public loginFilter(AuthenticationManager authenticationManager, jwtUtil jwtUtil){
//        this.authenticationManager = authenticationManager;
//        this.jwtUtil = jwtUtil;
//    }
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
//
//        // 클라이언트 요청에서 userId, password 추출
//        String userId = obtainUsername(request);
//        String password = obtainPassword(request);
//        System.out.println(userId);
//        System.out.println(password);
//        // 스프링 시큐리티에서 username과 password를 검증하기 위해서는 UsernamePasswordAuthenticationToken에 담아야 함
//        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userId, password, null);
//        // token에 담은 정보를 검증을 위한 AuthenticationManager로 전달
//
//        return authenticationManager.authenticate(authToken);
//    }
//
//    // 로그인 성공시 실행하는 메소드 (성공시 JWT를 발급)
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
//        System.out.println("login success");
//        //UserDetails
//        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
//
//        String userId = customUserDetails.getUsername();  // userId 추출
//
//        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
//        GrantedAuthority auth = iterator.next();
//
//        String role = auth.getAuthority();  // role 추출
//
//        String token = jwtUtil.createJwt(userId, role, 60*60*10L);  // 토큰 생성
//
//        response.addHeader("Authorization", "Bearer " + token);
//    }
//
//    //로그인 실패시 실행하는 메소드
//    @Override
//    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
//        System.out.println("login failed");
//        response.setStatus(401);
//    }
//}
