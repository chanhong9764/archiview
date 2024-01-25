package com.ssafy.archiview.repository.Recruit;

import com.ssafy.archiview.entity.Recruit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface RecruitRepository extends JpaRepository<Recruit, Integer>, RecruitRepositoryCustom {
}
