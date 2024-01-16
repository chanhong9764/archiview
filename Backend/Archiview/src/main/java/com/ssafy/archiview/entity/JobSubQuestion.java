package com.ssafy.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Entity
@Table(name = "job_sub_question") // 직무 소분류_질문
public class JobSubQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "job_sub_id")
    private JobSub jobSub;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
}
