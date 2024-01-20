package com.ssafy.archiview.dto.question;

import lombok.Builder;
import lombok.Getter;

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
}
