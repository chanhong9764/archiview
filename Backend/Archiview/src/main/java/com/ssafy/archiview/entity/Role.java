package com.ssafy.archiview.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {
    /*
        USER: 회원
        MEMBER: 공유 회원
     */
    USER("USER"),
    MEMBER("MEMBER");

    final String role;
}
