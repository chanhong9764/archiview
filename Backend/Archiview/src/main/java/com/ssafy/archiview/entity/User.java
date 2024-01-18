package com.ssafy.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Entity // 회원
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @Column(name = "id")
    private String id;  // 아이디

    @NotNull
    @Column(name = "pw")
    private String pw;  // 비밀번호

    @NotNull
    @Column(name = "name")
    private String name;  // 이름

    @NotNull
    @Column(name = "email", unique = true)
    private String email;  // 이름

    @Column(name = "profile_url")
    private String profileUrl;  // 프로필 URL

    @Column(name = "introduce")
    private String introduce;  // 자기소개

    @Column(name = "role")
    @ColumnDefault("'USER'")
    @Enumerated(EnumType.STRING)
    private Role role;  // 권한

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;  // 생성 날짜
    @Builder
    public User(String id, String pw, String name, String email, String profileUrl, String introduce, Role role, LocalDateTime createdAt) {
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.email = email;
        this.profileUrl = profileUrl;
        this.introduce = introduce;
        this.role = role;
        this.createdAt = createdAt;
    }
}
