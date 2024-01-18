package com.####.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
@Entity // 직무 소분류
@Getter
@Table(name = "job_sub")
public class JobSub {
    @Id
    @Column(name = "name", length = 64)
    private String name;

    @ManyToOne
    @JoinColumn(name = "job_main_id")
    private JobMain jobMain;
}
