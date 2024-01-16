package com.####.archiview.response.exception;

import com.####.archiview.response.code.ResponseCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RestApiException extends RuntimeException {
	private final ResponseCode responseCode;
}
