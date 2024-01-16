package com.####.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Entity
@Getter
@DynamicInsert
@Table(name = "reply") // 답변
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    @NotNull
    private String userId;

    @Column(name = "question_id")
    @NotNull
    private Integer questionId;

    @ColumnDefault("''")
    @Column(name = "script")
    private String script;

    @ColumnDefault("''")
    @Column(name = "video_url")
    private String videoUrl;

    @ColumnDefault("''")
    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(name = "created_at")
    @NotNull
    private LocalDateTime createdAt;
}
