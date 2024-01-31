package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.User;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    default User getById(String id) {
        return findById(id).orElseThrow(() -> new RestApiException(ErrorCode.USER_NOT_FOUND));
    }
    Optional<User> findByIdAndEmail(String id, String email);
    Optional<User> findByNameAndEmail(String name, String email);
    Optional<User> findByEmail(String userInfo);
}
