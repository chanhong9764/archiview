//package com.ssafy.archiview.util;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Header;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.stereotype.Component;
//
//import java.security.Key;
//import java.time.Duration;
//import java.util.Date;
//import java.util.function.Function;
//
//@Component
//public class jwtUtil {
//    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//
//    // 토큰 발급 메서드
//    public static String createToken(String userId){
//        Date now = new Date();
//        Date expiration = new Date(now.getTime() + Duration.ofDays(1).toMillis()); // 만료기간 1일
//        Claims id = Jwts.claims();
//        id.put("userId", userId);
//        return Jwts.builder()
//                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)  // 1
//                .setClaims(id)
//                .setIssuedAt(now)  // 토큰 발급 시간
//                .setExpiration(expiration)  // 토큰 만료 시간
////                .setIssuer("archiview")  // 토큰 발급자
////                .setSubject("")  // 토큰 제목
//                .signWith(SECRET_KEY)
//                .compact();
//    }
//
//    // 토큰에서 모든 클레임을 추출하는 메서드
//    private Claims extractAllClaims(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(SECRET_KEY)
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }
//    // 토큰에서 특정 클레임을 추출하는 메서드
//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }
//}
