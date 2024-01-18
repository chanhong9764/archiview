package com.ssafy.archiview.response.handler;

import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.code.ResponseCode;
import com.ssafy.archiview.response.exception.RestApiException;
import com.ssafy.archiview.response.structure.ErrorResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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

    /**
     * RequestBody javax.validation.Valid or @Validated 으로 binding error 발생시 발생
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException e,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        System.out.println("hihih");
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
