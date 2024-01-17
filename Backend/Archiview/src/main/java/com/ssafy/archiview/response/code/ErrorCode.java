package com.####.archiview.response.code;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode implements ResponseCode {
    /*
        Common
     */
    INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "유효하지 않은 파라미터입니다."),
    UNAUTHORIZED_REQUEST(HttpStatus.UNAUTHORIZED, "인증되지 않은 사용자입니다."),
    FORBIDDEN_ACCESS(HttpStatus.FORBIDDEN, "권한이 존재하지 않은 사용자입니다."),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "리소스가 존재하지 않습니다."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "허용되지 않은 METHOD 요청입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버에서 오류가 발생했습니다."),

    /*
        USER
     */
    DUPLICATED_USER(HttpStatus.CONFLICT, "이미 가입된 유저 정보입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "유저의 정보를 찾을 수 없습니다."),
    ;
    private final HttpStatus httpStatus;
    private final String message;

}