package com.####.archiview.repository;

import com.####.archiview.entity.User;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.exception.RestApiException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    default User getById(String id) {
        return findById(id).orElseThrow(() -> new RestApiException(ErrorCode.USER_NOT_FOUND));
    }
    int countByIdAndEmail(String id, String email);
    Optional<User> findByNameAndEmail(String name, String email);
    Optional<User> findByEmail(String userInfo);
}
