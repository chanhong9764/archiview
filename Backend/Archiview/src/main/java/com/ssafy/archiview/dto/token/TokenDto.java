package com.####.archiview.dto.token;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class TokenDto {
    private String accessToken;
    private String refreshToken;
}
