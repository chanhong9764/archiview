package com.####.archiview.repository;

import com.####.archiview.entity.User;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.exception.RestApiException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    default User getById(String id) {
        return findById(id).orElseThrow(() -> new RestApiException(ErrorCode.USER_NOT_FOUND));
    }
//    User findByid(String userId);
//    User findByUserId(String userId);
}
