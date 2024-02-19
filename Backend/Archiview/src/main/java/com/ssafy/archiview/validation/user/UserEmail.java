package com.ssafy.archiview.validation.user;

import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UserEmailValidator.class)
public @interface UserEmail {
    String message() default "올바르지 않은 이메일 형식입니다.";
    Class[] groups() default {};
    Class[] payload() default {};
}
