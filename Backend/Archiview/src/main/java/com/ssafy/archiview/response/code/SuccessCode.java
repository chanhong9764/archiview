package com.####.archiview.response.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SuccessCode implements ResponseCode {
    /*
        USER
     */
    JOIN_SUCCESS(HttpStatus.CREATED, "회원가입에 성공했습니다."),
    LOGIN_SUCCESS(HttpStatus.OK, "로그인에 성공했습니다."),
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
