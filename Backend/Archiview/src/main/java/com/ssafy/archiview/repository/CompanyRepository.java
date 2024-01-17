package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.Company;
import com.ssafy.archiview.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
}
