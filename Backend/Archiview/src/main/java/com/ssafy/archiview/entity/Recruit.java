package com.####.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "recruit") // 채용공고
public class Recruit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "company_id")
    @NotNull
    private Integer companyId;

    @Column(name = "title")
    @NotNull
    private String title;

    @Column(name = "content")
    @NotNull
    private String content;

    @Column(name = "start")
    @NotNull
    private LocalDateTime start;

    @Column(name = "end")
    @NotNull
    private LocalDateTime end;
}
