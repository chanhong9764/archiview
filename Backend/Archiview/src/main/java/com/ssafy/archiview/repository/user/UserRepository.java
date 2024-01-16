package com.ssafy.archiview.repository.user;

import com.ssafy.archiview.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public class UserRepository implements JpaRepository<User, Long> {
}
