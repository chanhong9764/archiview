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

    @ManyToOne
    @JoinColumn(name = "cs_sub_id")
    private CsSub csSub;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
}
