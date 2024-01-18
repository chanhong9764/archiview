package com.ssafy.archiview.repository;

import com.ssafy.archiview.entity.User;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    default User getById(String id) {
        return findById(id).orElseThrow(() -> new RestApiException(ErrorCode.USER_NOT_FOUND));
    }
}
