package com.ssafy.archiview.entity;

import com.ssafy.archiview.dto.reply.ReplyDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity // 답변
@Getter
@DynamicInsert
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "question_id")
    @NotNull
    private Integer questionId;

    @Column(name = "script", columnDefinition = "TEXT")
    private String script;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "reply", fetch = FetchType.LAZY)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "reply", fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

    public ReplyDto.info toDto() {
        return ReplyDto.info.builder()
                .id(id)
                .userId(user.getId())
                .script(script)
                .comments(comments.stream()
                        .map(Comment::toCommentDto)
                        .collect(Collectors.toList()))
                .videoUrl(videoUrl)
                .thumbnailUrl(thumbnailUrl)
                .likeCnt(likes.size())
                .build();
    }
}
