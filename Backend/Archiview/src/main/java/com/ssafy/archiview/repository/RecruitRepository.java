package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.Recruit;
import com.ssafy.archiview.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruitRepository extends JpaRepository<Recruit, Integer> {
}
