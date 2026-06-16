package com.testsite.auth.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "testsite.jwt")
public record JwtProperties(
        String secret,
        long accessTokenValidityMs,
        long refreshTokenValidityMs
) {
}
