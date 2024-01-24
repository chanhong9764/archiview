package com.ssafy.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity // 직무 소분류_질문
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "job_sub_question")
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
    @Builder
    public JobSubQuestion(Integer id, JobSub jobSub, Question question) {
        this.id = id;
        this.jobSub = jobSub;
        this.question = question;
    }
}
