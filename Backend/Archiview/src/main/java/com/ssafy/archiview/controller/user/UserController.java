package com.ssafy.archiview.controller.user;

import com.ssafy.archiview.dto.user.UserDto;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;
    @PostMapping
    public ResponseEntity<Object> userAdd(@RequestBody @Valid UserDto.AddRequestDto requestDto) {
        service.userAdd(requestDto);
        return SuccessResponse.createSuccess(SuccessCode.JOIN_SUCCESS);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> userLogin(@RequestBody UserDto.loginRequestDto requestDto){
        service.userLogin(requestDto);
        return SuccessResponse.createSuccess(SuccessCode.LOGIN_SUCCESS);
    }
}
