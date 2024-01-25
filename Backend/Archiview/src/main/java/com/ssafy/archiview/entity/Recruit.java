package com.ssafy.archiview.entity;

import com.ssafy.archiview.dto.recruit.RecruitDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name = "start")
    @NotNull
    private LocalDateTime start;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name = "end")
    @NotNull
    private LocalDateTime end;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    public RecruitDto.DetailListResponseDto toDetailListDto() {
        return RecruitDto.DetailListResponseDto.builder()
                .id(id)
                .companyName(company.getName())
                .start(start.format(DateTimeFormatter.ISO_DATE))
                .end(end.format(DateTimeFormatter.ISO_DATE))
                .build();
    }

    public RecruitDto.info toInfoDto() {
        return RecruitDto.info.builder()
                .id(id)
                .title(title)
                .start(start.format(DateTimeFormatter.ISO_DATE))
                .end(end.format(DateTimeFormatter.ISO_DATE))
                .build();
    }
}
