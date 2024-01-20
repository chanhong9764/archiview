package com.ssafy.archiview.entity;

import com.ssafy.archiview.dto.question.QuestionDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity // 질문
@Getter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "content")
    @NotNull
    private String content;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY)
    private List<CsSubQuestion> csSubQuestionList = new ArrayList<>();

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY)
    private List<JobSubQuestion> jobSubQuestionList = new ArrayList<>();

    public QuestionDto.info toDto() {
        return QuestionDto.info.builder()
                .id(id)
                .content(content)
                .build();
    }
}
