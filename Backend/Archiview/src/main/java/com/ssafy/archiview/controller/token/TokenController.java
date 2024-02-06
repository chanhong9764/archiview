package com.ssafy.archiview.controller.token;

import com.ssafy.archiview.dto.token.TokenDto;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.token.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/token")
public class TokenController {
    private final TokenService service;
    @GetMapping  // 엑세스 토큰 만료시 재발급 요청 API
    public ResponseEntity<Object> updateAccessToken(HttpServletRequest request){
        String accessToken = request.getHeader("Authorization");
        String refreshToken = request.getHeader("RefreshToken");
        TokenDto.updateTokenDto dto = service.updateAccessToken(accessToken, refreshToken);
        return SuccessResponse.createSuccess(SuccessCode.UPDATE_TOKEN_SUCCESS, dto);
    }
}
