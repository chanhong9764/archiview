package com.ssafy.archiview.signalingserver.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:80",
                        "http://localhost:8080",
                        "http://localhost:3000",
                        "http://i10b105.p.ssafy.io:8080",
                        "http://i10b105.p.ssafy.io:80",
                        "https://i10b105.p.ssafy.io:443",
                        "https://i10b105.p.ssafy.io:8443")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Authorization", "Content-Type")
                .exposedHeaders("Custom-Header")
                .maxAge(3600);
    }
}