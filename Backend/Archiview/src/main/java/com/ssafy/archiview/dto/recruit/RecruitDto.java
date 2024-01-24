package com.ssafy.archiview.dto.recruit;

import com.ssafy.archiview.dto.company.CompanyDto;
import com.ssafy.archiview.dto.question.QuestionDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

public class RecruitDto {
    @Getter
    public static class info {
        private final int id;
        private final String title;
        private final String start;
        private final String end;
        @Builder
        public info(int id, String title, String start, String end) {
            this.id = id;
            this.title = title;
            this.start = start;
            this.end = end;
        }
    }

    @Getter
    public static class DetailListRequestDto {
        private final String date;
        private final int companyId;
        @Builder
        public DetailListRequestDto(String date, int companyId) {
            this.date = date;
            this.companyId = companyId;
        }
    }

    @Getter
    public static class DetailListResponseDto {
        private final int id;
        private final String companyName;
        private final String start;
        private final String end;
        @Builder
        public DetailListResponseDto(int id, String companyName, String start, String end) {
            this.id = id;
            this.companyName = companyName;
            this.start = start;
            this.end = end;
        }
    }

    @Getter
    public static class DetailResponseDto {
        private final RecruitDto.info recruit;
        private final CompanyDto.info company;
        private final List<QuestionDto.info> questions;
        @Builder
        public DetailResponseDto(info recruit, CompanyDto.info company, List<QuestionDto.info> questions) {
            this.recruit = recruit;
            this.company = company;
            this.questions = questions;
        }
    }
}