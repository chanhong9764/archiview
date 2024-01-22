package com.####.archiview.repository;

import com.####.archiview.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobSubQuestionRepository extends JpaRepository<JobSubQuestion, Integer> {
    JobSubQuestion findByJobSubName(JobSub jobSubName);
}
