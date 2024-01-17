package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
