package com.ssafy.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity // 공통/특화 소분류 테이블
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "cs_sub")
public class CsSub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", length = 64)
    private String name;

    @ManyToOne
    @JoinColumn(name = "cs_main_id")
    private CsMain csMain;
    @Builder
    public CsSub(String name, CsMain csMain) {
        this.name = name;
        this.csMain = csMain;
    }
}
