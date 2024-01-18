package com.ssafy.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDateTime;
@Entity // 채용공고
@Getter
public class Recruit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    @NotNull
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    @NotNull
    private String content;

    @Column(name = "start")
    @NotNull
    private LocalDateTime start;

    @Column(name = "end")
    @NotNull
    private LocalDateTime end;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}
