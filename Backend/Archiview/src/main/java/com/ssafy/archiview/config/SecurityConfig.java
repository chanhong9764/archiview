//package com.ssafy.archiview.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//
////@Configuration //스프링 환경설정 파일을 의미 -> 스프링 시큐리티의 설정
////@EnableWebSecurity //모든 요청 URL이 스프링 시큐리티의 제어를 받음
////public class SecurityConfig extends WebSecurityConfiguration {
////    @Bean
////    // 스프링 시큐리티의 세부 설정은 SecurityFilterChain 빈을 생성하여 설정 가능
////    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
////        http.authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
////             // 모든 인증되지 않은 요청을 허락한다는 의미 -> 로그인 하지 않더라도 모든페이지에 접근가능
////            .requestMatchers(new AntPathRequestMatcher("/**")).permitAll());
////        return http.build();
////    }
////}
//
//
