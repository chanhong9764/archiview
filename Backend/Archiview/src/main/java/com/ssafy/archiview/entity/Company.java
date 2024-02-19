package com.ssafy.archiview.entity;

import com.ssafy.archiview.dto.common.CommonDto;
import com.ssafy.archiview.dto.company.CompanyDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity // 기업 테이블
@Getter
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 64)
    @NotNull
    private String name;

    @Column(name = "url")
    private String url;

    public CompanyDto.info toDto() {
        return CompanyDto.info.builder()
                .id(id)
                .name(name)
                .url(url)
                .build();
    }

    public CommonDto.companyResponseDto toListDto() {
        return CommonDto.companyResponseDto.builder()
                .id(id)
                .name(name)
                .build();
    }
}
