package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.Recruit;
import com.ssafy.archiview.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface RecruitRepository extends JpaRepository<Recruit, Integer> {
    List<Recruit> findAllByStartBetween(LocalDateTime start, LocalDateTime end);
}
