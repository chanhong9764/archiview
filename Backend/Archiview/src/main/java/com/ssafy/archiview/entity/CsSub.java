package com.####.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Entity
@Table(name = "cs_sub")  // 공통/특화 소분류 테이블
public class CsSub {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 64)
    @NotNull
    private String name;

    @ManyToOne
    @JoinColumn(name = "cs_main_id")
    private CsMain csMain;
}
