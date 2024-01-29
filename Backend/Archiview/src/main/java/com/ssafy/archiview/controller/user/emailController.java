package com.####.archiview.controller.user;

import com.####.archiview.dto.token.EmailTokenDto;
import com.####.archiview.jwt.jwtUtil;
import com.####.archiview.response.code.SuccessCode;
import com.####.archiview.response.structure.SuccessResponse;
import com.####.archiview.service.user.MailService;
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
        EmailTokenDto dto = jwtUtil.createEmailToken(email, auth_number);
		return SuccessResponse.createSuccess(SuccessCode.EMAIL_SUCCESS, dto);
    }
}