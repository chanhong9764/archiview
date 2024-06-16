package com.ssafy.archiview.utils;

import com.ssafy.archiview.dto.token.TokenDto;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class jwtUtil {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    private SecretKey secretKey;
    public jwtUtil(@Value("${jwt.secret}") String secret){
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }
    Long accessTokenValidTime = 60 * 30 * 1000L;  // 엑세스 토큰 유효기간 30분
    Long refreshTokenValidTime = 60 * 60 * 24 * 14 * 1000L;  // 리프레시 토큰 유효기간 2주
    Long TokenValidTime = 60 * 10 * 1000L;  // 유효기간 10분
    public TokenDto.createTokenDto createJwt(String username, String role) {
        String accessToken = Jwts.builder()
                .claim("role", role)
                .claim("userId", username)
                .issuedAt(new Date(System.currentTimeMillis()))  // 토큰 발행 시간
                .expiration(new Date(System.currentTimeMillis() + accessTokenValidTime))  // 토큰 만료 시간
                .signWith(secretKey)
                .compact();

        String refreshToken = Jwts.builder()
                .claim("role", role)
                .claim("userId", username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + refreshTokenValidTime))
                .signWith(secretKey)
                .compact();

        return TokenDto.createTokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public String createAccessToken(String userId, String role){
        return Jwts.builder()
                .claim("role", role)
                .claim("userId", userId)
                .issuedAt(new Date(System.currentTimeMillis()))  // 토큰 발행 시간
                .expiration(new Date(System.currentTimeMillis() + accessTokenValidTime))  // 토큰 만료 시간
                .signWith(secretKey)
                .compact();
    }



    public String createValidToken(String email) {
        return Jwts.builder()
                .claim("email", email)
                .issuedAt(new Date(System.currentTimeMillis()))  // 토큰 발행 시간
                .expiration(new Date(System.currentTimeMillis() + TokenValidTime))  // 토큰 만료 시간
                .signWith(secretKey)
                .compact();
    }

    public String getUsername(String token) {  // 아이디를 검증하는 메서드
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("userId").toString();
    }

    public String getUserEmail(String token) {  // 이메일을 검증하는 메서드
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("email").toString();
    }

    public String getRole(String token) {  // role을 검증하는 메서드
//        validateToken(token);  // 토큰 검증
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String accessToken) {
        // 토큰 복호화
        Claims claims = parseClaims(accessToken);
        // 클레임에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("role").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // UserDetails 객체를 만들어서 Authentication 리턴
        UserDetails principal = new User((String) claims.get("userId"), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    private Claims parseClaims(String accessToken) {  // 엑세스 토큰 클레임 추출
        try {
            return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(accessToken).getPayload();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    // 토큰 정보를 검증하는 메서드
    public boolean validateToken(String token) throws JwtException {
        Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
        return true;
    }

    // 이메일 토큰인지, 로그인 토큰인지 확인하는 메서드
    public boolean checkClaims(String token) {
        String payload = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("userId", String.class);
        // 로그인 토큰이면 true
        // 이메일 토큰이면 false
        return !(payload == null);
    }

    public Long getValidTime(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().getTime();
    }

    // Request Header에서 토큰 정보 추출
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean isValidAccessToken(String accessToken) {
        return redisTemplate.opsForValue().get(accessToken) == null;
    }
}
