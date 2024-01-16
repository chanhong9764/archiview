package com.ssafy.archiview.validation.user;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UserEmailValidator implements ConstraintValidator<UserEmail, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value == null) {
            return false;
        }
        return value.matches("^[0-9a-zA-Z]([-_￦.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_￦.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$");
    }
}
