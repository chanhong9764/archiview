package com.ssafy.archiview.dto.company;

import com.ssafy.archiview.dto.question.QuestionDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class CompanyDto {
    @Getter
    public static class info {
        private final int id;
        private final String name;
        private final String url;
        @Builder
        public info(int id, String name, String url) {
            this.id = id;
            this.name = name;
            this.url = url;
        }
    }
}
