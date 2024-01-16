package com.####.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Entity(name = "company")  // 기업 테이블
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 64)
    @NotNull
    private String name;

    @Column(name = "url", length = 255)
    private String url;
}
