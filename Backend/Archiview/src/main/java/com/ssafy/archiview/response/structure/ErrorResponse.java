package com.ssafy.archiview.response.structure;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponse {
	private final String code;
	private final String message;

	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private final Map<String, String> errors;
}
