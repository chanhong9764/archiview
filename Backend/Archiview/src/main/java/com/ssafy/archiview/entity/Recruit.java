package com.####.archiview.entity;

import com.####.archiview.dto.recruit.RecruitDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

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

    @Column(name = "start")
    @NotNull
    private LocalDateTime start;

    @Column(name = "end")
    @NotNull
    private LocalDateTime end;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    public RecruitDto.DetailListResponseDto toDetailListDto(Recruit entity) {
        return RecruitDto.DetailListResponseDto.builder()
                .companyName(entity.company.getName())
                .start(entity.start.format(DateTimeFormatter.ISO_DATE))
                .end(entity.end.format(DateTimeFormatter.ISO_DATE))
                .build();
    }
}
