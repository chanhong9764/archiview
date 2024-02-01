package com.####.archiview.controller.user;

import com.####.archiview.dto.user.UserDto;
import com.####.archiview.entity.User;
import com.####.archiview.jwt.jwtUtil;
import com.####.archiview.response.code.ErrorCode;
import com.####.archiview.response.code.SuccessCode;
import com.####.archiview.response.exception.RestApiException;
import com.####.archiview.response.structure.SuccessResponse;
import com.####.archiview.service.user.UserService;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver;

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

    @GetMapping("/find-id")  // 아이디 찾기
    public ResponseEntity<Object> findId(@RequestParam String name, HttpServletRequest request){
        String email = jwtUtil.getUserEmail(request);
        User user = service.findId(name, email);
        return SuccessResponse.createSuccess(SuccessCode.FIND_ID_SUCCESS, user.getId());
    }

    @GetMapping("/find-password")  // 패스워드 찾기
    public ResponseEntity<Object> findPassword(@RequestParam String id, @RequestParam String email){
        service.findPassword(id, email);
        return SuccessResponse.createSuccess(SuccessCode.FIND_PASSWORD_SUCCESS);
    }

    @PostMapping("/valid-password")  // 패스워드 확인
    public ResponseEntity<Object> validPassword(@RequestBody UserDto.passwordDto dto, HttpServletRequest request){
        String userId = jwtUtil.getUsername(request);
        service.validPassword(userId, dto.getPw());
        return SuccessResponse.createSuccess(SuccessCode.PASSWORD_SUCCESS);
    }

    @PatchMapping("/update-password")  // 패스워드 변경
    public ResponseEntity<Object> updatePassword(@RequestBody UserDto.passwordDto dto, HttpServletRequest request){
        String userInfo;
        if(jwtUtil.checkClaims(request.getHeader("Authorization"))){
            userInfo = jwtUtil.getUsername(request);
        }else{
            userInfo = jwtUtil.getUserEmail(request);
        }
        System.out.println(userInfo);
        service.updatePassword(userInfo, dto.getPw());
        return SuccessResponse.createSuccess(SuccessCode.PASSWORD_UPDATE_SUCCESS);
    }

    @PatchMapping  // 프로필, 자기소개 변경
    public ResponseEntity<Object> updateUserDetail(@RequestBody UserDto.userDetailDto dto, HttpServletRequest request){
        String userId = jwtUtil.getUsername(request);
        service.updateUserDetail(dto.getProfileUrl(), dto.getIntroduce(), userId);
        return SuccessResponse.createSuccess(SuccessCode.PROFILE_UPDATE_SUCCESS);
    }
}

