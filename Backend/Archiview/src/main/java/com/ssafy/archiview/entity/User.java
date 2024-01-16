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

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user") // 회원
public class User {
    @Id
    @Column(name = "id")
    private String id;

    @NotNull
    @Column(name = "pw")
    private String pw;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "profile_url")
    private String profileUrl;

    @Column(name = "introduce")
    private String introduce;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user")
    private List<Reply> replies = new ArrayList<>();

    @Builder
    public User(String id, String pw, String name, String email, String profileUrl, String introduce, LocalDateTime createdAt, List<Reply> replies) {
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.email = email;
        this.profileUrl = profileUrl;
        this.introduce = introduce;
        this.createdAt = createdAt;
        this.replies = replies;
    }
}
