package com.####.archiview.dto.token;

import com.####.archiview.entity.Role;
import lombok.*;

@Getter
@AllArgsConstructor
public class EmailTokenDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class joinEmailResponseDto {
        private int authNumber;

        @Builder
        public joinEmailResponseDto(int authNumber) {
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
