package com.ssafy.archiview.jwt;

import com.ssafy.archiview.dto.token.TokenDto;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class jwtUtil {
    private final SecretKey secretKey;
    public jwtUtil(@Value("${jwt.secret}") String secret){
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }
    private Long accessTokenVaildTime = 30 * 1000L;  // 엑세스 토큰 유효기간 30초
    private Long refreshTokenVaildTime = 30 * 60 * 1000L;  // 리프레시 토큰 유효기간 30분
    public TokenDto createJwt(String username, String role) {
        String accessToken = Jwts.builder()
                .claim("userId", username)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))  // 토큰 발행 시간
                .expiration(new Date(System.currentTimeMillis() + accessTokenVaildTime))  // 토큰 만료 시간
                .signWith(secretKey)
                .compact();

        String refreshToken = Jwts.builder()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + refreshTokenVaildTime))
                .signWith(secretKey)
                .compact();
        return new TokenDto(accessToken, refreshToken);
    }

    public String getUsername(String token) {  // 아이디를 검증하는 메서드
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("userId", String.class);
    }

    public String getRole(String token) {  // role을 검증하는 메서드
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    public Boolean isExpired(String token) {  // 토큰 만료를 검증하는 메서드
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }
}
