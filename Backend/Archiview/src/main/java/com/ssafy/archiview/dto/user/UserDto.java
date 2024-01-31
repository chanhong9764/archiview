package com.####.archiview.dto.user;

import com.####.archiview.entity.Role;
import com.####.archiview.entity.User;
import com.####.archiview.validation.user.UserEmail;
import com.####.archiview.validation.user.UserId;
import com.####.archiview.validation.user.UserName;
import com.####.archiview.validation.user.UserPassword;
import lombok.*;

public class UserDto {
    @Getter
    @Setter
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
    public static class loginRequestDto{
        @UserId
        private String id;
        @UserPassword
        private String pw;

        @Builder
        public loginRequestDto(String id, String pw){
            this.id = id;
            this.pw = pw;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class loginResponseDto {
        private String id;
        private String name;
        private String email;
        private String profileUrl;
        private String introduce;
        private Role role;
        private String accessToken;
        private String refreshToken;

        @Builder
        public loginResponseDto(String id, String name, String email, String profileUrl, String introduce, Role role, String accessToken, String refreshToken) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.profileUrl = profileUrl;
            this.introduce = introduce;
            this.role = role;
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class logoutDto {
        private String id;
        private String name;
        private String email;
        private String profileUrl;
        private String introduce;
        private Role role;
        private String refreshToken;

        @Builder
        public logoutDto(String id, String name, String email, String profileUrl, String introduce, Role role, String refreshToken) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.profileUrl = profileUrl;
            this.introduce = introduce;
            this.role = role;
            this.refreshToken = refreshToken;
        }

        public User toEntity() {
            return User.builder()
                    .id(id)
                    .name(name)
                    .email(email)
                    .profileUrl(profileUrl)
                    .introduce(introduce)
                    .role(role)
                    .refreshToken(refreshToken)
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
        private Role role;

        @Builder
        public DetailResponseDto(String id, String name, String email, String introduce, String profileUrl, Role role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.introduce = introduce;
            this.profileUrl = profileUrl;
            this.role = role;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class passwordDto {
        private String pw;

        @Builder
        public passwordDto(String pw) {
            this.pw = pw;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class userDetailDto {
        private String profileUrl;
        private String introduce;

        @Builder
        public userDetailDto(String profileUrl, String introduce) {
            this.profileUrl = profileUrl;
            this.introduce = introduce;
        }
    }
}
