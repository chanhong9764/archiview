package com.ssafy.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Entity
@Table(name = "cs_sub_question")  // 공통/특화 소분류_질문 테이블
public class CsSubQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "question_id")
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer questionId;

    @Column(name = "cs_sub_id")
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer csSubId;
}
