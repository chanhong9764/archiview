package com.ssafy.archiview.dto.recruit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class RecruitDto {
    @Getter
    public static class DetailListResponseDto {
        private final String companyName;
        private final String start;
        private final String end;
        @Builder
        public DetailListResponseDto(String companyName, String start, String end) {
            this.companyName = companyName;
            this.start = start;
            this.end = end;
        }
    }
}
