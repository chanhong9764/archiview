//package com.ssafy.archiview.entity;
//
//import jakarta.persistence.Id;
//import lombok.Builder;
//import lombok.Getter;
//import org.springframework.data.redis.core.RedisHash;
//import org.springframework.data.redis.core.index.Indexed;
//
//@Getter
//@RedisHash(value = "refreshToken", timeToLive = 20)  // 2주 뒤 refreshToken 삭제
//public class RefreshToken {
//    @Id
//    private String id;
//    @Indexed
//    private String refreshToken;
//
//    @Builder
//    public RefreshToken(String id, String refreshToken){
//        this.id = id;
//        this.refreshToken = refreshToken;
//    }
//}
