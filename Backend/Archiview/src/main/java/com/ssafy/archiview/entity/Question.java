package com.ssafy.archiview.entity;

import com.ssafy.archiview.dto.question.QuestionDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity // 질문
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY)
    private List<Reply> replyList = new ArrayList<>();

    @Builder
    public Question(Integer id, String content, Company company, List<CsSubQuestion> csSubQuestionList, List<JobSubQuestion> jobSubQuestionList) {
        this.id = id;
        this.content = content;
        this.company = company;
        this.csSubQuestionList = csSubQuestionList;
        this.jobSubQuestionList = jobSubQuestionList;
    }

    public QuestionDto.info toDto() {
        return QuestionDto.info.builder()
                .id(id)
                .content(content)
                .build();
    }

    public QuestionDto.DetailInfo toDetailInfoDto() {
        return QuestionDto.DetailInfo.builder()
                .content(content)
                .companyName(company.getName())
                .csList(csSubQuestionList.stream()
                        .map(csSubQuestion -> csSubQuestion.getCsSub().getName())
                        .collect(Collectors.toList()))
                .jobList(jobSubQuestionList.stream()
                        .map(jobSubQuestion -> jobSubQuestion.getJobSub().getName())
                        .collect(Collectors.toList()))
                .build();
    }

    public QuestionDto.SearchInfo toSearchDto() {
        return QuestionDto.SearchInfo.builder()
                .id(id)
                .content(content)
                .companyName(company.getName())
                .csList(csSubQuestionList.stream()
                        .map(csSubQuestion -> csSubQuestion.getCsSub().getName())
                        .collect(Collectors.toList()))
                .jobList(jobSubQuestionList.stream()
                        .map(jobSubQuestion -> jobSubQuestion.getJobSub().getName())
                        .collect(Collectors.toList()))
                .replies(replyList.stream()
                        .map(reply -> {
                            return reply.toSearchDto();
                        })
                        .collect(Collectors.toList()))
                .build();
    }

}
