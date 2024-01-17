package com.####.archiview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
@Entity
@Getter
@Table(name = "\"like\"") // 추천
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "reply_id")
    @NotNull
    private Integer replyId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

