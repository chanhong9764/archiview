package com.####.archiview.dto.reply;

import com.####.archiview.entity.User;
import com.####.archiview.validation.user.UserEmail;
import com.####.archiview.validation.user.UserId;
import com.####.archiview.validation.user.UserName;
import com.####.archiview.validation.user.UserPassword;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReplyDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class AddRequestDto {
        @UserId
        private String id;
        @UserPassword
        private String pw;
        @UserEmail
        private String email;
        @UserName
        private String name;

        @Builder
        public AddRequestDto(String id, String pw, String email, String name) {
            this.id = id;
            this.pw = pw;
            this.email = email;
            this.name = name;
        }

        public User toEntity() {
            return User.builder()
                    .id(id)
                    .pw(pw)
                    .email(email)
                    .name(name)
                    .build();
        }
    }
}
