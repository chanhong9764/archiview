package com.####.archiview.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {
    /*
        USER: 회원
        MEMBER: 공유 회원
        BLOCK: 회원정지
        ADMIN: 관리자
     */
    USER("USER"),
    MEMBER("MEMBER"),
    ADMIN("ADMIN"),
    BLOCK("BLOCK");

    final String role;
}
