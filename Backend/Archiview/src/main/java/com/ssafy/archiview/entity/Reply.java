package com.ssafy.archiview.entity;

import com.ssafy.archiview.dto.reply.ReplyDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity // 답변
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @OneToMany(mappedBy = "reply", fetch = FetchType.LAZY)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "reply", fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

    @Builder
    public Reply(Question question, String script, String videoUrl, String thumbnailUrl, User user) {
        this.question = question;
        this.script = script;
        this.videoUrl = videoUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.user = user;
    }

    public ReplyDto.info toDto() {
        return ReplyDto.info.builder()
                .id(id)
                .userId(user.getId())
                .script(script)
                .comments(comments.stream()
                        .map(Comment::toCommentDto)
                        .collect(Collectors.toList()))
                .question(question.toDetailInfoDto())
                .videoUrl(videoUrl)
                .thumbnailUrl(thumbnailUrl)
                .likeCnt(likes.size())
                .build();
    }

    public ReplyDto.searchDto toSearchDto() {
        // 추천 여부를 넣어줘야 할까....??
        return ReplyDto.searchDto.builder()
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

    public void updateEntity(ReplyDto.ModifyRequestDto requestDto) {
        this.script = requestDto.getScript();
        this.videoUrl = requestDto.getVideoUrl();
        this.thumbnailUrl = requestDto.getThumbnailUrl();
    }
}
