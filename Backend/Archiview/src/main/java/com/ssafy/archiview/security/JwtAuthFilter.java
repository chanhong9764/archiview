package com.####.archiview.security;

import com.####.archiview.jwt.jwtUtil;
import com.####.archiview.service.user.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

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
            if (refreshToken != null && jwtUtil.validateToken(refreshToken)){
                setAuthentication(refreshToken, request);
            } else if (jwtUtil.validateToken(accessToken)) {
                setAuthentication(accessToken, request);
            }
        }
        filterChain.doFilter(request, response);  // 다음 필터로 넘김
    }

    public void setAuthentication(String token, HttpServletRequest request){
        String userId = jwtUtil.getUsername(request);
        if(userId == null){  // 이메일 인증 토큰이면 return
            return;
        }
        // 유저와 토큰 일치 시 userDetail 생성
        UserDetails userDetails = customuserDetailsService.loadUserByUsername(userId);
        System.out.println("3");
        if (userDetails != null){
            // UserDetails, Password, Role -> 접근권한 인증 Token 생성
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            // 현재 Request의 Security Context에 접근권한 설정
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }
    }
}
