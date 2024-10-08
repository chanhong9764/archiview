package com.ssafy.archiview.filter;

import com.ssafy.archiview.utils.JwtUtil;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class JwtAuthFilter extends OncePerRequestFilter {  // OncePerRequestFilter : 한번 실행 보장
    private final JwtUtil jwtUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwtUtil.resolveToken(request);
        try {
            if (token != null && jwtUtil.validateToken(token)) {
                if(jwtUtil.checkClaims(token)) {
                    Authentication authentication = jwtUtil.getAuthentication(token);
                    if (jwtUtil.isValidAccessToken(token)) {
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    } else {
                        throw new JwtException("만료된 토큰입니다.");
                    }
                }
            }
        } catch (JwtException e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);  // 다음 필터로 넘김
    }
}
