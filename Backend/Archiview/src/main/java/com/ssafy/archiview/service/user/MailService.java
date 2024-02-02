package com.ssafy.archiview.service.user;

import com.ssafy.archiview.repository.UserRepository;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private final UserRepository repository;
    @Value("spring.mail.username")
    private String senderEmail;
    private static int number;

    public static void createNumber(){
       number = (int)(Math.random() * (90000)) + 100000;
    }
    
    public MimeMessage CreateMail(String mail){
        createNumber();
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, mail);
            message.setSubject("이메일 인증");
            String body = "";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            body += "<h1>" + number + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body,"UTF-8", "html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return message;
    }
    
    public int sendMail(String email){
        MimeMessage message = CreateMail(email);
        javaMailSender.send(message);
        return number;
    }

    public int findSendMail(String email){
        repository.findByEmail(email).orElseThrow(
                () -> new RestApiException(ErrorCode.USER_NOT_FOUND));
        return sendMail(email);
    }

    public int joinSendMail(String email){
        repository.findByEmail(email).ifPresent(user -> {
            throw new RestApiException(ErrorCode.DUPLICATED_USER);
        });
        return sendMail(email);
    }
}