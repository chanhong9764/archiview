//package com.####.archiview.repository;
//
//import com.####.archiview.entity.RefreshToken;
//import com.####.archiview.response.code.ErrorCode;
//import com.####.archiview.response.exception.RestApiException;
//import org.springframework.data.repository.CrudRepository;
//
//import java.util.Optional;
//
//public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
//    default RefreshToken getById(String refreshToken) {
//        return findById(refreshToken).orElseThrow(() -> new RestApiException(ErrorCode.UNSUPPORTED_TOKEN));
//    }
//}
