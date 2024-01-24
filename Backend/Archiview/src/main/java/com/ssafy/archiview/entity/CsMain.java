package com.ssafy.archiview.entity;

import com.ssafy.archiview.dto.common.CommonDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity // 공통/특화 대분류 테이블
@Getter
@Table(name = "cs_main")
public class CsMain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 64)
    @NotNull
    private String name;

    @OneToMany(mappedBy = "csMain", fetch = FetchType.LAZY)
    private List<CsSub> csSubList = new ArrayList<>();

    public CommonDto.csMainDto toDto() {
        return CommonDto.csMainDto.builder()
                .name(name)
                .csSubList(csSubList.stream()
                        .map(CsSub::getName)
                        .collect(Collectors.toList()))
                .build();
    }
}
