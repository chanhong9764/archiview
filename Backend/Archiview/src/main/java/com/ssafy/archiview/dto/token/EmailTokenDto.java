package com.####.archiview.dto.token;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EmailTokenDto {
    private String emailToken;
    private int number;
}
