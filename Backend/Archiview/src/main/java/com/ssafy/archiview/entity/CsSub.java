package com.ssafy.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
@Entity // 공통/특화 소분류 테이블
@Getter
@Table(name = "cs_sub")
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
