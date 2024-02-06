package com.####.archiview.repository;

import com.####.archiview.entity.JobSub;
import com.####.archiview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobSubRepository extends JpaRepository<JobSub, String> {
    Optional<JobSub> findByName(String name);
}
