package com.ssafy.archiview.service.user;

<<<<<<< HEAD
import com.ssafy.archiview.dto.mail.MailDto;
=======
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
import com.ssafy.archiview.repository.UserRepository;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
<<<<<<< HEAD
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.concurrent.TimeUnit;
=======
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private final UserRepository repository;
    @Value("spring.mail.username")
    private String senderEmail;
<<<<<<< HEAD
    private final RedisTemplate<String, String> redisTemplate;

    public static int createNumber(){
       return (int)(Math.random() * (90000)) + 100000;
    }
    
    public int sendEmail(String mail) {
        int authNumber = createNumber();
=======
    private static int number;

    public static void createNumber(){
       number = (int)(Math.random() * (90000)) + 100000;
    }
    
    public MimeMessage CreateMail(String mail){
        createNumber();
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, mail);
            message.setSubject("이메일 인증");
            String body = "";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
<<<<<<< HEAD
            body += "<h1>" + authNumber + "</h1>";
=======
            body += "<h1>" + number + "</h1>";
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body,"UTF-8", "html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
<<<<<<< HEAD
        javaMailSender.send(message);

        // redis 인증번호 저장
        redisTemplate.opsForValue().set(
                mail,
                String.valueOf(authNumber),
                180,
                TimeUnit.SECONDS
        );

        return authNumber;
    }

    public void findSendMail(String email){
        repository.findByEmail(email).orElseThrow(
                () -> new RestApiException(ErrorCode.USER_NOT_FOUND));
        sendEmail(email);
    }

    public void joinSendMail(String email){
        repository.findByEmail(email).ifPresent(user -> {
            throw new RestApiException(ErrorCode.DUPLICATED_USER);
        });
        sendEmail(email);
    }

    public void checkAuth(MailDto.authRequestDto dto) {
        String number = redisTemplate.opsForValue().get(dto.getEmail());

        if(!StringUtils.hasText(number) || !number.equals(dto.getNumber())) {
            throw new RestApiException(ErrorCode.INVALID_NUMBER);
        }
=======
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
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
    }
}