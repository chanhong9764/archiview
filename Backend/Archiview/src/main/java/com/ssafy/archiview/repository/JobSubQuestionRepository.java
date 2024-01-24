package com.####.archiview.repository;

import com.####.archiview.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobSubQuestionRepository extends JpaRepository<JobSubQuestion, Integer> {
    Optional<JobSubQuestion> findByJobSubAndQuestionId(JobSub jobSub, int questionId);
}
