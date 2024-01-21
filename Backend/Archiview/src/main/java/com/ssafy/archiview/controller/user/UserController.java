package com.####.archiview.controller.user;

import com.####.archiview.dto.user.UserDto;
import com.####.archiview.response.code.SuccessCode;
import com.####.archiview.response.structure.SuccessResponse;
import com.####.archiview.service.user.UserService;
import com.####.archiview.validation.user.UserId;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import com.####.archiview.util.jwtUtil;
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

//    @PostMapping("/login")
//    public ResponseEntity<Object> userLogin(@RequestBody UserDto.loginRequestDto requestDto) {
//        UserDto.loginResponseDto responseDto = service.userLogin(requestDto);
//        String token = jwtUtil.createToken(responseDto.getId());
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
