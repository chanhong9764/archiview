package com.ssafy.archiview.dto.reply;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.archiview.entity.*;
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
        private List<String> csList;
        private List<String> jobList;

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
            this.csList = csList.stream()
                    .map(o -> o.getCsSub().getName())
                    .collect(Collectors.toList());
            this.jobList = jobList.stream()
                    .map(o -> o.getJobSub().getName())
                    .collect(Collectors.toList());
        }
    }
    @Getter
    @AllArgsConstructor
    public static class DetailRequestDto {
        private final int id;
        private final String userId;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class CommentDto {
        private int id;
        private String userId;
        private String content;

        @Builder
        public CommentDto(Comment entity) {
            this.id = entity.getId();
            this.userId = entity.getUser().getId();
            this.content = entity.getContent();
        }
    }

    @Getter
    public static class LikeRequestDto {
        private final int id;
        private final String userId;

        @Builder
        public LikeRequestDto(int id, String userId) {
            this.id = id;
            this.userId = userId;
        }

        public Like toEntity(Reply reply, User user) {
            return Like.builder()
                    .user(user)
                    .reply(reply)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    public static class LikeResponseDto {
        private final int likeCount;
    }

    @Getter
    public static class CommentRequestDto {
        private final int replyId;
        private final String userId;
        private final String content;
        @Builder
        public CommentRequestDto(int replyId, String userId, String content) {
            this.replyId = replyId;
            this.userId = userId;
            this.content = content;
        }
        public Comment toEntity(Reply reply, User user, String content) {
            return Comment.builder()
                    .reply(reply)
                    .user(user)
                    .content(content)
                    .build();
        }
    }

    @Getter
    public static class CommentResponseDto {
        private final int id;
        private final String userId;
        private final String content;

        @Builder
        public CommentResponseDto(int id, String userId, String content) {
            this.id = id;
            this.userId = userId;
            this.content = content;
        }
    }
}
