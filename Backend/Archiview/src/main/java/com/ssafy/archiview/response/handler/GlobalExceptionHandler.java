package com.ssafy.archiview.response.handler;

import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.code.ResponseCode;
import com.ssafy.archiview.response.exception.RestApiException;
import com.ssafy.archiview.response.structure.ErrorResponse;
<<<<<<< HEAD
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
=======
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.security.access.AccessDeniedException;
=======
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
	
	/**
	 * RestApiException 예외 처리
	 */
	@ExceptionHandler(RestApiException.class)
    public ResponseEntity<Object> handleRestApiException(final RestApiException e) {
        final ResponseCode responseCode = e.getResponseCode();
        return handleExceptionInternal(responseCode);
    }

    /**
     * 비즈니스 로직 수행 도중, 사용자의 요청 파라미터가 적절하지 않을 때 발생
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgument(final IllegalArgumentException e) {
        final ResponseCode responseCode = ErrorCode.INVALID_PARAMETER;
        return handleExceptionInternal(responseCode, e.getMessage());
    }

<<<<<<< HEAD
    @ExceptionHandler({SignatureException.class, MalformedJwtException.class, UnsupportedJwtException.class})
    public ResponseEntity<Object> handleJwtException(final Exception e) {
        final ResponseCode responseCode = ErrorCode.INVALID_PARAMETER;
        return handleExceptionInternal(responseCode, "유효하지 않은 토큰입니다.");
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<Object> handleJwtAuthException(final ExpiredJwtException e) {
        final ResponseCode responseCode = ErrorCode.UNAUTHORIZED_REQUEST;
        return handleExceptionInternal(responseCode, "만료된 토큰입니다.");
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAuthException(final AccessDeniedException e) {
        final ResponseCode responseCode = ErrorCode.FORBIDDEN_ACCESS;
        return handleExceptionInternal(responseCode, "권한이 존재하지 않습니다.");
    }

=======
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
    /**
     * RequestBody javax.validation.Valid or @Validated 으로 binding error 발생시 발생
     */
    @Override
<<<<<<< HEAD
    public ResponseEntity<Object> handleMethodArgumentNotValid(
=======
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
            MethodArgumentNotValidException e,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
<<<<<<< HEAD
=======
        System.out.println("hihih");
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
        final ResponseCode responseCode = ErrorCode.INVALID_PARAMETER;
        return handleExceptionInternal(e, responseCode);
    }

    /**
     * RequestParam, PathVariable 유효성 검사
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolationException(final ConstraintViolationException e) {
        final ResponseCode responseCode = ErrorCode.INVALID_PARAMETER;
        return handleExceptionInternal(e, responseCode);
    }

    /**
     * RequestParam, PathVariable 타입이 다른 값이 들어왔을 경우
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Object> handleMethodArgumentTypeMismatchException(final MethodArgumentTypeMismatchException e) {
        final ResponseCode responseCode = ErrorCode.INVALID_PARAMETER;
        return handleExceptionInternal(responseCode, responseCode.getMessage());
    }

    /**
     * 선언한 예외 외의 모든 것을 처리
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAllException(final Exception e) {
        final ResponseCode responseCode = ErrorCode.INTERNAL_SERVER_ERROR;
        return handleExceptionInternal(responseCode);
    }

    private ResponseEntity<Object> handleExceptionInternal(final ResponseCode responseCode) {
        return ResponseEntity.status(responseCode.getHttpStatus())
                .body(makeErrorResponse(responseCode));
    }

    private ResponseEntity<Object> handleExceptionInternal(final ResponseCode responseCode, final String message) {
        return ResponseEntity.status(responseCode.getHttpStatus())
                .body(makeErrorResponse(responseCode, message));
    }

    private ResponseEntity<Object> handleExceptionInternal(final BindException e, final ResponseCode responseCode) {
        return ResponseEntity.status(responseCode.getHttpStatus())
                .body(makeErrorResponse(e, responseCode));
    }
    private ResponseEntity<Object> handleExceptionInternal(final ConstraintViolationException e, final ResponseCode responseCode) {
        return ResponseEntity.status(responseCode.getHttpStatus())
                .body(makeErrorResponse(e, responseCode));
    }

    private ErrorResponse makeErrorResponse(final ResponseCode responseCode) {
        return ErrorResponse.builder()
                .code(responseCode.name())
                .message(responseCode.getMessage())
                .build();
    }

    private ErrorResponse makeErrorResponse(final ResponseCode responseCode, final String message) {
        return ErrorResponse.builder()
                .code(responseCode.name())
                .message(message)
                .build();
    }

    private ErrorResponse makeErrorResponse(final BindException e, final ResponseCode responseCode) {
        final Map<String, String> errors = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        fieldError -> Optional.ofNullable(fieldError.getDefaultMessage()).orElse("")
                ));

        return ErrorResponse.builder()
                .code(responseCode.name())
                .message(responseCode.getMessage())
                .errors(errors)
                .build();
    }

    private ErrorResponse makeErrorResponse(final ConstraintViolationException e, final ResponseCode responseCode) {
        Map<String, String> errors = e.getConstraintViolations().stream()
                .collect(Collectors.toMap(
                        violation -> StreamSupport.stream(violation.getPropertyPath().spliterator(), false)
                                .reduce((first, second) -> second)
                                .get().toString(),
                        ConstraintViolation::getMessage
                ));

        return ErrorResponse.builder()
                .code(responseCode.name())
                .message(responseCode.getMessage())
                .errors(errors)
                .build();
    }

}
