package com.ssafy.archiview.dto.mail;

import com.ssafy.archiview.validation.user.UserId;
import com.ssafy.archiview.validation.user.UserPassword;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MailDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class authRequestDto{
        private String email;
        private String number;

        @Builder
        public authRequestDto(String email, String number){
            this.email = email;
            this.number = number;
        }
    }
}
