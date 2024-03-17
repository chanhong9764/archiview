package com.ssafy.archiview.entity;

import com.ssafy.archiview.dto.common.CommonDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    @OneToMany(mappedBy = "jobMain", fetch = FetchType.LAZY)
    private List<JobSub> jobSubList = new ArrayList<>();

    public CommonDto.jobMainDto toDto() {
        return CommonDto.jobMainDto.builder()
                .name(name)
                .jobSubList(jobSubList.stream()
                        .map(JobSub::getName)
                        .collect(Collectors.toList()))
                .build();
    }
}
