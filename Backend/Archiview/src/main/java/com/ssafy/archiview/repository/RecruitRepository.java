package com.####.archiview.repository;

import com.####.archiview.entity.Recruit;
import com.####.archiview.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface RecruitRepository extends JpaRepository<Recruit, Integer> {
    List<Recruit> findAllByStartBetween(LocalDateTime start, LocalDateTime end);
}
