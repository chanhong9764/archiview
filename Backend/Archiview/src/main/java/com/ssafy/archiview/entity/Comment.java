package com.####.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "comment")  // 댓글 테이블
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", length = 16)
    @NotNull
    private String userId;

    @Column(name = "reply_id")
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer replyId;

    @Column(name = "content", length = 255)
    @NotNull
    @ColumnDefault("'")
    private String content;
}
