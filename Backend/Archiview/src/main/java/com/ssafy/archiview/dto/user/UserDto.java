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

import java.time.LocalDateTime;

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
    public static class loginResponseDto{
        @UserId
        private String id;
        @UserName
        private String name;
        @UserEmail
        private String email;
        private String profileUrl;
        private String introduce;
        private LocalDateTime createdAt;
        private Role role;


        public loginResponseDto(String id, String name, String email, String profileUrl, String introduce, LocalDateTime createdAt, Role role){
            this.id = id;
            this.name = name;
            this.email = email;
            this.profileUrl = profileUrl;
            this.introduce = introduce;
            this.createdAt = createdAt;
            this.role = role;
        }

        public User toEntity(){
            return User.builder()
                    .id(id)
                    .name(name)
                    .email(email)
                    .profileUrl(profileUrl)
                    .introduce(introduce)
                    .createdAt(createdAt)
                    .role(role)
                    .build();
        }
    }
}
