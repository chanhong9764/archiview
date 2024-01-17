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

    @ManyToOne
    @JoinColumn(name = "reply_id")
    private Reply reply;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

