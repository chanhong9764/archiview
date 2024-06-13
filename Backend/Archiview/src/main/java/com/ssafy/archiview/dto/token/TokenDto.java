package com.ssafy.archiview.dto.token;

import lombok.*;


public class TokenDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class createTokenDto{  // 로그인시 토큰 발급을 위한 dto
        private String accessToken;
        private String refreshToken;

        @Builder
        public createTokenDto(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class updateTokenDto{  // 엑세스 토큰 만료시 재발급을 위한 dto
        private String accessToken;

        @Builder
        public updateTokenDto(String accessToken) {
            this.accessToken = accessToken;
        }
    }
}
