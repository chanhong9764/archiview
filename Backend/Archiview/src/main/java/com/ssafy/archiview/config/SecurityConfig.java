package com.####.archiview.config;

import com.####.archiview.jwt.jwtUtil;
import com.####.archiview.jwt.loginFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    //AuthenticationManager가 인자로 받을 AuthenticationConfiguraion 객체 생성자 주입
    private final AuthenticationConfiguration authenticationConfiguration;
    private final jwtUtil jwtUtil;
    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, jwtUtil jwtUtil) {

        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
    }

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
                .csrf((auth) -> auth.disable())  //csrf disable
                .formLogin((auth) -> auth.disable())  //From 로그인 방식 disable -> jwt 로그인 사용하기 때문
                .httpBasic((auth) -> auth.disable())  //http basic 인증 방식 disable
                .authorizeHttpRequests((auth) -> auth  //경로별 인가 작업
                        .requestMatchers("/api/users/login").permitAll()  // /api/** 모든 요청 허용
                        .anyRequest().authenticated())
                .sessionManagement((session) -> session  //세션 설정 -> 세션 stateless 상태로 변경
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterAt(new loginFilter(authenticationManager(authenticationConfiguration), jwtUtil), UsernamePasswordAuthenticationFilter.class);
                // 필터 추가 LoginFilter()는 인자를 받음 (AuthenticationManager() 메소드에 authenticationConfiguration 객체를 넣어야 함) 따라서 빈 등록 필요
        return http.build();
    }
}