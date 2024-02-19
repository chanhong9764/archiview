package com.ssafy.archiview.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.structure.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) {
        JwtExceptionHandlerFilter.setErrorResponse(response, ErrorCode.FORBIDDEN_ACCESS);
    }
}
