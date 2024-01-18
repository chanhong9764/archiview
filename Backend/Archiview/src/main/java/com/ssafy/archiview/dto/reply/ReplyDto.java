package com.####.archiview.dto.reply;

import com.####.archiview.entity.*;
import com.####.archiview.validation.user.UserEmail;
import com.####.archiview.validation.user.UserId;
import com.####.archiview.validation.user.UserName;
import com.####.archiview.validation.user.UserPassword;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

public class ReplyDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class DetailResponseDto {
        private int id;
        private String userId;
        private String questionContent;
        private String script;
        private String videoUrl;
        private String thumbnailUrl;
        private boolean isLike;
        private int likeCount;
        private List<CommentDto> comments;
        private String companyName;
        private List<CsSubQuestion> csList;
        private List<JobSubQuestion> jobList;

        @Builder
        public DetailResponseDto(int id, String userId, String questionContent, String script, String videoUrl, String thumbnailUrl, boolean isLike, int likeCount, List<Comment> comments, String companyName, List<CsSubQuestion> csList, List<JobSubQuestion> jobList) {
            this.id = id;
            this.userId = userId;
            this.questionContent = questionContent;
            this.script = script;
            this.videoUrl = videoUrl;
            this.thumbnailUrl = thumbnailUrl;
            this.isLike = isLike;
            this.likeCount = likeCount;
            this.comments = comments.stream()
                    .map(CommentDto::new)
                    .collect(Collectors.toList());
            this.companyName = companyName;
            this.csList = csList;
            this.jobList = jobList;
        }

        @Getter
        public static class CommentDto {
            private int id;
            private String userId;
            private String content;

            public CommentDto(Comment entity) {
                this.id = entity.getId();
                this.userId = entity.getUser().getId();
                this.content = entity.getContent();
            }
        }
    }
}
