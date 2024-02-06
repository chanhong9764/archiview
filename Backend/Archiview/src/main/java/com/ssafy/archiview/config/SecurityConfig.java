package com.ssafy.archiview.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.archiview.filter.JwtExceptionHandlerFilter;
import com.ssafy.archiview.jwt.*;
import com.ssafy.archiview.filter.JsonUsernamePasswordAuthenticationFilter;
import com.ssafy.archiview.filter.JwtAuthFilter;
import com.ssafy.archiview.service.user.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    //AuthenticationManager가 인자로 받을 AuthenticationConfiguraion 객체 생성자 주입
    private final AuthenticationConfiguration authenticationConfiguration;
    private final CustomUserDetailsService customUserDetailsService;
    private final jwtUtil jwtUtil;

    private final ObjectMapper objectMapper;
    private final UserDetailsService loginService;
    private LoginSuccessHandler loginSuccessHandler;
    private LoginFailureHandler loginFailureHandler;

    //AuthenticationManager Bean 등록
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf((auth) -> auth.disable())  // 토큰 방식이므로 csrf 설정 해제
                .formLogin((auth) -> auth.disable())  // jwt 로그인 사용하기 때문에 From 로그인 방식 disable
                .httpBasic((auth) -> auth.disable())  // http basic 인증 방식 disable
                .sessionManagement((session) -> session   // JWT 사용 위해 기존의 세션 방식 인증 해제
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // URL Mapping
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("api/admin/**").hasRole("ADMIN")  // ADMIN 접근 가능
                        .requestMatchers(HttpMethod.GET, "api/replies/**").hasAnyRole("MEMBER", "ADMIN")  // 질문상세조회
                        .requestMatchers(HttpMethod.POST, "api/replies/**").hasAnyRole("MEMBER", "ADMIN")  // 댓글작성, 좋아요
                        .requestMatchers(HttpMethod.DELETE, "api/replies/**").hasAnyRole("MEMBER", "ADMIN")  // 댓글삭제, 좋아요 취소
                        .requestMatchers(HttpMethod.POST ,"/api/users").permitAll()  // 회원가입 허용
                        .requestMatchers(HttpMethod.POST ,"/api/users/login").permitAll()  // 로그인 허용
                        .requestMatchers("api/users/find-id", "api/users/find-password").permitAll()  // 아이디 찾기, 패스워드 찾기 허용
                        .requestMatchers("api/users/find-email", "api/users/join-email").permitAll()  // 이메일 인증 요청 허용
                        .requestMatchers("api/questions/**", "api/recruits/**", "api/commons/**").permitAll() // ~ 허용
                        .anyRequest().authenticated())  // 나머지 요청은 모두 인증 되어야 함.
                .addFilterBefore(jsonUsernamePasswordAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtAuthFilter(customUserDetailsService, jwtUtil), JsonUsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtExceptionHandlerFilter(), JwtAuthFilter.class);
        return http.build();
    }

    @Bean
    public JsonUsernamePasswordAuthenticationFilter jsonUsernamePasswordAuthenticationFilter() {
        JsonUsernamePasswordAuthenticationFilter jsonUsernamePasswordAuthenticationFilter = new JsonUsernamePasswordAuthenticationFilter(objectMapper, jwtUtil /*, loginSuccessHandler, loginFailureHandler*/);
        jsonUsernamePasswordAuthenticationFilter.setAuthenticationManager(authManager());
        return jsonUsernamePasswordAuthenticationFilter;
    }

    @Bean
    public AuthenticationManager authManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder());
        provider.setUserDetailsService(loginService);

        return new ProviderManager(provider);
    }
}