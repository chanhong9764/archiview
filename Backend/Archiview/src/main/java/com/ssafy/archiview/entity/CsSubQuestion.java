package com.ssafy.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity // 공통/특화 소분류_질문 테이블
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "cs_sub_question")
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
    @Builder
    public CsSubQuestion(Integer id, CsSub csSub, Question question) {
        this.id = id;
        this.csSub = csSub;
        this.question = question;
    }
}
