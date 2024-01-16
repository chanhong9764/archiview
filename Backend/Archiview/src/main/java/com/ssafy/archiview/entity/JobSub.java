package com.ssafy.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
@Table(name = "job_sub") // 직무 소분류
public class JobSub {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "job_main_id")
    @NotNull
    private Integer jobMainId;

    @Column(name = "name")
    @NotNull
    private String name;
}
