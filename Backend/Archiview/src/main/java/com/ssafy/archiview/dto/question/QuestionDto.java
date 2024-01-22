package com.ssafy.archiview.dto.question;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
public class QuestionDto {
    @Getter
    public static class info {
        private final int id;
        private final String content;
        @Builder
        public info(int id, String content) {
            this.id = id;
            this.content = content;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class DetailInfo {
        private String questionContent;
        private String companyName;
        private List<String> csList;
        private List<String> jobList;
        @Builder
        public DetailInfo(String questionContent, String companyName, List<String> csList, List<String> jobList) {
            this.questionContent = questionContent;
            this.companyName = companyName;
            this.csList = csList;
            this.jobList = jobList;
        }
    }
}
