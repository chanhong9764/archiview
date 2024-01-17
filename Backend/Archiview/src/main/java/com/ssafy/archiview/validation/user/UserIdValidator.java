package com.ssafy.archiview.validation.user;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UserIdValidator implements ConstraintValidator<UserId, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value == null) {
            return false;
        }
        return value.matches("^[a-z0-9]{4,16}$");
    }
}
