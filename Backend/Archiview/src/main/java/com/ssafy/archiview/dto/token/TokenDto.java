package com.ssafy.archiview.dto.token;

import lombok.*;


public class TokenDto {

    @Getter
    @AllArgsConstructor
    public static class createTokenDto{  // 로그인시 토큰 발급을 위한 dto
        private String accessToken;
        private String refreshToken;
    }

    @Getter
    @AllArgsConstructor
    public static class updateTokenDto{  // 엑세스 토큰 만료시 재발급을 위한 dto
        private String accessToken;
    }
}
