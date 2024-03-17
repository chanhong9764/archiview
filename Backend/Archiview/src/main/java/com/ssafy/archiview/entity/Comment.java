package com.ssafy.archiview.entity;

import com.ssafy.archiview.dto.comment.CommentDto;
import com.ssafy.archiview.dto.reply.ReplyDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
@Entity // 댓글 테이블
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "content")
    @NotNull
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "reply_id")
    private Reply reply;
    @Builder
    public Comment(Integer id, String content, User user, Reply reply) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.reply = reply;
    }

    public CommentDto.info toCommentDto() {
        return CommentDto.info.builder()
                .id(id)
                .userId(user.getId())
                .content(content)
                .build();
    }
}
