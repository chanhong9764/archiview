package com.ssafy.archiview.controller.user;

import com.ssafy.archiview.dto.token.TokenDto;
import com.ssafy.archiview.dto.user.UserDto;
import com.ssafy.archiview.jwt.jwtUtil;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.user.UserService;
import com.ssafy.archiview.validation.user.UserId;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
    @PostMapping
    public ResponseEntity<Object> userAdd(@RequestBody @Valid UserDto.AddRequestDto requestDto) {
        service.userAdd(requestDto);
        return SuccessResponse.createSuccess(SuccessCode.JOIN_SUCCESS);
    }

//    @PostMapping("/login")
//    public ResponseEntity<Object> userLogin(/* @RequestBody UserDto.loginRequestDto requestDto */) {
////        UserDto.loginResponseDto responseDto = service.userLogin(requestDto);
////        System.out.println(responseDto.toString());
//
//        TokenDto token = jwtUtil.createJwt(responseDto.getId(), responseDto.getRole().toString());
//        responseDto.insertToken(token);
//        System.out.println("login Success");
//        return SuccessResponse.createSuccess(SuccessCode.LOGIN_SUCCESS, responseDto);
//    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> userDetail(@PathVariable @UserId String id) {
        UserDto.DetailResponseDto responseDto = service.userDetail(id);
        return SuccessResponse.createSuccess(SuccessCode.USER_DETAIL_SUCCESS, responseDto);
    }
}
