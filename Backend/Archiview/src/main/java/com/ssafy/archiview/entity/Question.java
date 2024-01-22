package com.####.archiview.entity;

import com.####.archiview.dto.question.QuestionDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public QuestionDto.DetailInfo toDetailInfoDto() {
        return QuestionDto.DetailInfo.builder()
                .questionContent(content)
                .companyName(company.getName())
                .csList(csSubQuestionList.stream()
                        .map(csSubQuestion -> csSubQuestion.getCsSub().getName())
                        .collect(Collectors.toList()))
                .jobList(jobSubQuestionList.stream()
                        .map(jobSubQuestion -> jobSubQuestion.getJobSub().getName())
                        .collect(Collectors.toList()))
                .build();
    }
}
