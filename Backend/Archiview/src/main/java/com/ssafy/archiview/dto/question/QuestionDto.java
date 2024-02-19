package com.ssafy.archiview.dto.question;

import com.ssafy.archiview.dto.reply.ReplyDto;
import com.ssafy.archiview.entity.Question;
import lombok.*;

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
        private String content;
        private String companyName;
        private List<String> csList;
        private List<String> jobList;
        @Builder
        public DetailInfo(String content, String companyName, List<String> csList, List<String> jobList) {
            this.content = content;
            this.companyName = companyName;
            this.csList = csList;
            this.jobList = jobList;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class SearchRequest {
        private String userId;
        private String companyName;
        private List<String> csList;
        private List<String> jobList;
        private int pgno;
        @Builder
        public SearchRequest(String userId, String companyName, List<String> csList, List<String> jobList, int pgno) {
            this.userId = userId;
            this.companyName = companyName;
            this.csList = csList;
            this.jobList = jobList;
            this.pgno = pgno;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class SearchInfo {
        private int id;
        private String content;
        private String companyName;
        private List<String> csList;
        private List<String> jobList;
        private List<ReplyDto.searchDto> replies;
        @Builder
        public SearchInfo(int id, String content, String companyName, List<String> csList, List<String> jobList, List<ReplyDto.searchDto> replies) {
            this.id = id;
            this.content = content;
            this.companyName = companyName;
            this.csList = csList;
            this.jobList = jobList;
            this.replies = replies;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    public static class SearchResponse {
        private List<Question> questions;
    }
}
