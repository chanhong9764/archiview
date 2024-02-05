package com.ssafy.archiview.dto.token;

import com.ssafy.archiview.entity.Role;
import lombok.*;

@Getter
@AllArgsConstructor
public class EmailTokenDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class joinEmailResponseDto {
        private String emailToken;
        private int authNumber;

        @Builder
        public joinEmailResponseDto(String emailToken, int authNumber) {
            this.emailToken = emailToken;
            this.authNumber = authNumber;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class findEmailResponseDto {
        private String emailToken;
        private int authNumber;

        @Builder
        public findEmailResponseDto(String emailToken, int authNumber) {
            this.emailToken = emailToken;
            this.authNumber = authNumber;
        }
    }
}
