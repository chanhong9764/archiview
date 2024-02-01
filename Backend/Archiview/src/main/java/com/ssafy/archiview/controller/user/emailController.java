package com.ssafy.archiview.controller.user;

import com.ssafy.archiview.dto.token.EmailTokenDto;
import com.ssafy.archiview.jwt.jwtUtil;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.user.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/email")
public class emailController {
    private final jwtUtil jwtUtil;
    private final MailService mailService;

    @GetMapping
    public ResponseEntity<Object> MailSend(@RequestParam("email") String email){
        int auth_number = mailService.sendMail(email);
        EmailTokenDto.findEmailResponseDto dto = jwtUtil.createEmailToken(email, auth_number);
		return SuccessResponse.createSuccess(SuccessCode.EMAIL_SUCCESS, dto);
    }
}