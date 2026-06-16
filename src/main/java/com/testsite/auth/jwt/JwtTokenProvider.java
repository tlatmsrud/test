package com.testsite.auth.jwt;

import com.testsite.common.exception.BusinessException;
import com.testsite.common.exception.ErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtTokenProvider {

    private static final String CLAIM_USER_ID = "uid";
    private static final String CLAIM_EMAIL = "email";
    private static final String TOKEN_TYPE = "type";
    private static final String TYPE_ACCESS = "access";
    private static final String TYPE_REFRESH = "refresh";

    private final SecretKey key;
    private final long accessValidityMs;
    private final long refreshValidityMs;

    public JwtTokenProvider(JwtProperties properties) {
        this.key = Keys.hmacShaKeyFor(properties.secret().getBytes(StandardCharsets.UTF_8));
        this.accessValidityMs = properties.accessTokenValidityMs();
        this.refreshValidityMs = properties.refreshTokenValidityMs();
    }

    public String createAccessToken(Long userId, String email) {
        return buildToken(userId, email, TYPE_ACCESS, accessValidityMs);
    }

    public String createRefreshToken(Long userId, String email) {
        return buildToken(userId, email, TYPE_REFRESH, refreshValidityMs);
    }

    public long getRefreshTokenValiditySeconds() {
        return refreshValidityMs / 1000;
    }

    private String buildToken(Long userId, String email, String type, long validityMs) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + validityMs);
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim(CLAIM_USER_ID, userId)
                .claim(CLAIM_EMAIL, email)
                .claim(TOKEN_TYPE, type)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(key)
                .compact();
    }

    public Claims parse(String token) {
        try {
            return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
        } catch (ExpiredJwtException e) {
            throw new BusinessException(ErrorCode.EXPIRED_TOKEN);
        } catch (JwtException | IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.INVALID_TOKEN);
        }
    }

    public Long getUserId(String token) {
        Claims claims = parse(token);
        return claims.get(CLAIM_USER_ID, Long.class);
    }

    public String getEmail(String token) {
        return parse(token).get(CLAIM_EMAIL, String.class);
    }

    public boolean isRefreshToken(String token) {
        return TYPE_REFRESH.equals(parse(token).get(TOKEN_TYPE, String.class));
    }
}
