package com.ssafy.archiview.controller.user;

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

    private final MailService mailService;
   
    @GetMapping
    public ResponseEntity<Object> MailSend(@RequestParam("email") String email){
    	System.out.println(email);
        int number = mailService.sendMail(email);
        System.out.println(number);
		return SuccessResponse.createSuccess(SuccessCode.JOIN_SUCCESS);
    }
}