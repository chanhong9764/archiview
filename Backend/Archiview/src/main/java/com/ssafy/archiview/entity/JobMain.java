package com.ssafy.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
@Entity // 직무 대분류 테이블
@Getter
@Table(name = "job_main")
public class JobMain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 64)
    @NotNull
    private String name;
}
