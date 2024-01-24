package com.####.archiview.dto.token;

import lombok.*;

@Getter
@AllArgsConstructor
public class TokenDto {
    private String accessToken;
    private String refreshToken;
}
