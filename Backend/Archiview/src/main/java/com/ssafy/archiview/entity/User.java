package com.ssafy.archiview.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Entity
@Getter
@DynamicInsert
@Table(name = "user") // 회원
public class User {
    @Id
    @NotNull
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

    @ColumnDefault("''")
    @Column(name = "profile_url")
    private String profileUrl;

    @ColumnDefault("''")
    @Column(name = "introduce")
    private String introduce;

    @NotNull
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
