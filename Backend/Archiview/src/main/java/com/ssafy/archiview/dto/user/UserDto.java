package com.####.archiview.dto.user;

import com.####.archiview.entity.Role;
import com.####.archiview.entity.User;
import com.####.archiview.validation.user.UserEmail;
import com.####.archiview.validation.user.UserId;
import com.####.archiview.validation.user.UserName;
import com.####.archiview.validation.user.UserPassword;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class UserDto {
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

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class DetailResponseDto {
        private String id;
        private String name;
        private String email;
        private String introduce;
        private String profileUrl;

        @Builder
        public DetailResponseDto(String id, String name, String email, String introduce, String profileUrl) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.introduce = introduce;
            this.profileUrl = profileUrl;
        }
    }
}
