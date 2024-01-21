package com.####.archiview.dto.user;

import com.####.archiview.entity.Role;
import com.####.archiview.entity.User;
import com.####.archiview.validation.user.UserEmail;
import com.####.archiview.validation.user.UserId;
import com.####.archiview.validation.user.UserName;
import com.####.archiview.validation.user.UserPassword;
import lombok.*;

import java.time.LocalDateTime;

public class UserDto {
    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @ToString
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
    @ToString
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

        public User toEntity(){
            return User.builder()
                    .id(id)
                    .pw(pw)
                    .build();
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
        private String jwtToken;

        @Builder
        public loginResponseDto(String id, String name, String email, String profileUrl, String introduce, Role role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.profileUrl = profileUrl;
            this.introduce = introduce;
            this.role = role;
        }

        public void insertToken(String token){
            this.jwtToken = token;
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
}
