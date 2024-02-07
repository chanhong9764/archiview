package com.ssafy.archiview.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
@Builder
@AllArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 1209600)  // 2주 뒤 refreshToken 삭제
public class RefreshToken {
    @Id
    private String id;
    @Indexed
    private String refreshToken;
}
