package com.ssafy.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
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

}
