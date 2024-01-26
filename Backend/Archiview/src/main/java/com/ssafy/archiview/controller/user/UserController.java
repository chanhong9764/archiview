package com.####.archiview.controller.user;

import com.####.archiview.dto.token.TokenDto;
import com.####.archiview.dto.user.UserDto;
import com.####.archiview.jwt.jwtUtil;
import com.####.archiview.response.code.SuccessCode;
import com.####.archiview.response.structure.SuccessResponse;
import com.####.archiview.service.user.UserService;
import com.####.archiview.validation.user.UserId;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;
    private final jwtUtil jwtUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    @PostMapping  // 회원가입
    public ResponseEntity<Object> userAdd(@RequestBody @Valid UserDto.AddRequestDto requestDto) {
        service.userAdd(requestDto);
        return SuccessResponse.createSuccess(SuccessCode.JOIN_SUCCESS);
    }
    @GetMapping("/logout")  // 로그아웃
    public ResponseEntity<Object> userLogout(HttpServletRequest request){
        service.userLogout(request);
        return SuccessResponse.createSuccess(SuccessCode.LOGOUT_SUCCESS);
    }

    @GetMapping  // 회원상세조회
    public ResponseEntity<Object> userDetail(HttpServletRequest request) {
        String userId = jwtUtil.getUsername(request);
        UserDto.DetailResponseDto responseDto = service.userDetail(userId);
        return SuccessResponse.createSuccess(SuccessCode.USER_DETAIL_SUCCESS, responseDto);
    }
    @DeleteMapping  // 회원탈퇴
    public ResponseEntity<Object> deleteUser(HttpServletRequest request){
        service.userDelete(request);
        return SuccessResponse.createSuccess(SuccessCode.DELETE_USER_SUCCESS);
    }

    @PostMapping("/valid-password")  // 비밀번호 확인
    public ResponseEntity<Object> validPassword(@RequestBody UserDto.passwordDto dto, HttpServletRequest request){
        String userId = jwtUtil.getUsername(request);
        service.validPassword(userId, dto.getPw());
        return SuccessResponse.createSuccess(SuccessCode.PASSWORD_SUCCESS);
    }
}

