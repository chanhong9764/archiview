package com.ssafy.archiview.dto.comment;

import com.ssafy.archiview.entity.Comment;
import com.ssafy.archiview.entity.Reply;
import com.ssafy.archiview.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class CommentDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class info {
        private int id;
        private String userId;
        private String content;
        @Builder
        public info(int id, String userId, String content) {
            this.id = id;
            this.userId = userId;
            this.content = content;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class request {
        private int replyId;
        private String userId;
        private String content;

        @Builder
        public request(int replyId, String userId, String content) {
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
}
