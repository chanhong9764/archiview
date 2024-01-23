package com.####.archiview.dto.reply;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.####.archiview.dto.comment.CommentDto;
import com.####.archiview.dto.question.QuestionDto;
import com.####.archiview.entity.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ReplyDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class info {
        private int id;
        private String userId;
        private String script;
        private String videoUrl;
        private String thumbnailUrl;
        private QuestionDto.DetailInfo question;
        private List<CommentDto.info> comments;
        private int likeCnt;
        @Builder
        public info(int id, String userId, QuestionDto.DetailInfo question, String script, String videoUrl, String thumbnailUrl, List<CommentDto.info> comments, int likeCnt) {
            this.id = id;
            this.userId = userId;
            this.script = script;
            this.question = question;
            this.videoUrl = videoUrl;
            this.thumbnailUrl = thumbnailUrl;
            this.comments = comments;
            this.likeCnt = likeCnt;
        }
    }
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class DetailResponseDto {
        ReplyDto.info reply;
        private boolean isLike;
        @Builder
        public DetailResponseDto(Reply reply, boolean isLike) {
            this.reply = reply.toDto();
            this.isLike = isLike;
        }
    }
    @Getter
    @AllArgsConstructor
    public static class DetailRequestDto {
        private final int id;
        private final String userId;
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
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class AddRequestDto {
        private int companyId;
        private String content;
        private List<String> csList;
        private List<String> jobList;

        private int questionId;
        private String script;
        private String videoUrl;
        private String thumbnailUrl;
        @Builder
        public AddRequestDto(int companyId, String content, List<String> csList, List<String> jobList, int questionId, String script, String videoUrl, String thumbnailUrl) {
            this.companyId = companyId;
            this.content = content;
            this.csList = csList;
            this.jobList = jobList;
            this.questionId = questionId;
            this.script = script;
            this.videoUrl = videoUrl;
            this.thumbnailUrl = thumbnailUrl;
        }

        public Question toQuestionEntity(Company company) {
            return Question.builder()
                    .company(company)
                    .content(content)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class ModifyRequestDto {
        private int id;
        private List<String> removeCsList = new ArrayList<>();
        private List<String> addCsList = new ArrayList<>();
        private List<String> removeJobList = new ArrayList<>();
        private List<String> addjobList = new ArrayList<>();
        private String script;
        private String videoUrl;
        private String thumbnailUrl;
        @Builder
        public ModifyRequestDto(int id, List<String> removeCsList, List<String> addCsList, List<String> removeJobList, List<String> addjobList, String script, String videoUrl, String thumbnailUrl) {
            this.id = id;
            this.removeCsList = removeCsList;
            this.addCsList = addCsList;
            this.removeJobList = removeJobList;
            this.addjobList = addjobList;
            this.script = script;
            this.videoUrl = videoUrl;
            this.thumbnailUrl = thumbnailUrl;
        }
    }
}
