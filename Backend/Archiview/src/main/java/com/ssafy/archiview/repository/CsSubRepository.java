package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.CsSub;
import com.ssafy.archiview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CsSubRepository extends JpaRepository<CsSub, String> {
    Optional<CsSub> findByName(String name);
}
