package com.ssafy.archiview.dto.user;

import com.ssafy.archiview.entity.Role;
import com.ssafy.archiview.entity.User;
import com.ssafy.archiview.validation.user.UserEmail;
import com.ssafy.archiview.validation.user.UserId;
import com.ssafy.archiview.validation.user.UserName;
import com.ssafy.archiview.validation.user.UserPassword;
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
}
