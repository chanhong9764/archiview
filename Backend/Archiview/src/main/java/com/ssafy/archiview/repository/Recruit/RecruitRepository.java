package com.####.archiview.repository.Recruit;

import com.####.archiview.entity.Recruit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface RecruitRepository extends JpaRepository<Recruit, Integer>, RecruitRepositoryCustom {
}
