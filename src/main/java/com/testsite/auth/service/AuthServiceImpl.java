package com.testsite.auth.service;

import com.testsite.auth.jwt.JwtTokenProvider;
import com.testsite.auth.refresh.RefreshToken;
import com.testsite.auth.refresh.RefreshTokenRepository;
import com.testsite.common.exception.BusinessException;
import com.testsite.common.exception.ErrorCode;
import com.testsite.user.domain.User;
import com.testsite.user.dto.mapper.UserMapper;
import com.testsite.user.dto.request.LoginRequest;
import com.testsite.user.dto.request.RefreshTokenRequest;
import com.testsite.user.dto.request.SignupRequest;
import com.testsite.user.dto.response.TokenResponse;
import com.testsite.user.dto.response.UserResponse;
import com.testsite.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public UserResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BusinessException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }
        User user = User.create(request.email(), passwordEncoder.encode(request.password()), request.name());
        User saved = userRepository.save(user);
        log.info("회원가입 완료 userId={} email={}", saved.getId(), saved.getEmail());
        return userMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public TokenResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_CREDENTIALS));
        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BusinessException(ErrorCode.INVALID_CREDENTIALS);
        }
        return issueTokens(user);
    }

    @Override
    @Transactional
    public TokenResponse refresh(RefreshTokenRequest request) {
        if (!tokenProvider.isRefreshToken(request.refreshToken())) {
            throw new BusinessException(ErrorCode.INVALID_TOKEN);
        }
        Long userId = tokenProvider.getUserId(request.refreshToken());
        RefreshToken stored = refreshTokenRepository.findById(String.valueOf(userId))
                .orElseThrow(() -> new BusinessException(ErrorCode.REFRESH_TOKEN_NOT_FOUND));
        if (!stored.getToken().equals(request.refreshToken())) {
            throw new BusinessException(ErrorCode.INVALID_TOKEN);
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
        return issueTokens(user);
    }

    @Override
    @Transactional
    public void logout(Long userId) {
        refreshTokenRepository.deleteById(String.valueOf(userId));
    }

    private TokenResponse issueTokens(User user) {
        String access = tokenProvider.createAccessToken(user.getId(), user.getEmail());
        String refresh = tokenProvider.createRefreshToken(user.getId(), user.getEmail());
        refreshTokenRepository.save(RefreshToken.builder()
                .id(String.valueOf(user.getId()))
                .userId(user.getId())
                .token(refresh)
                .ttlSeconds(tokenProvider.getRefreshTokenValiditySeconds())
                .build());
        return TokenResponse.of(access, refresh);
    }
}
