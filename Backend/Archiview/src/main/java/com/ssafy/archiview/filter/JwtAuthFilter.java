package com.ssafy.archiview.filter;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.archiview.dto.user.CustomUserDetails;
import com.ssafy.archiview.jwt.jwtUtil;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.structure.ErrorResponse;
import com.ssafy.archiview.service.user.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.lang.model.type.ErrorType;
import java.io.IOException;
import java.util.Arrays;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {  // OncePerRequestFilter : 한번 실행 보장
    private final CustomUserDetailsService customuserDetailsService;
    private final jwtUtil jwtUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = request.getHeader("Authorization");
        String refreshToken = request.getHeader("RefreshToken");
        System.out.println("토큰 필터입니다");
        // 헤더에 토큰이 있는 경우
        if(accessToken != null){
            System.out.println("헤더에 토큰이 존재합니다.");
          // 토큰 검증
            if(refreshToken != null){  // 리프레시 토큰이 존재 (엑세스 토큰 재발급 요청)
                if(jwtUtil.validateToken(refreshToken)){
                    System.out.println("검증된 리프레시 토큰입니다.");
                    setAuthentication(request);
                }
            }
            else {  // 재발급 요청 외 모든 요청
                if(jwtUtil.validateToken(accessToken)) {
                    System.out.println("검증된 엑세스 토큰입니다.");
                    setAuthentication(request);
                }
            }
        }
        filterChain.doFilter(request, response);  // 다음 필터로 넘김
    }

    public void setAuthentication(HttpServletRequest request){
        String userId = jwtUtil.getUsername(request);
        if(userId == null) {  // 이메일 인증 토큰이면 return
            return;
        }
        // 유저와 토큰 일치 시 userDetail 생성
        CustomUserDetails userDetails = (CustomUserDetails) customuserDetailsService.loadUserByUsername(userId);
        if (userDetails != null){
            // UserDetails, Password, Role -> 접근권한 인증 Token 생성
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null, userDetails.getAuthorities());
            // 현재 Request의 Security Context에 접근권한 설정
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }
    }
}
