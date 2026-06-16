package com.testsite.auth.service;

import com.testsite.user.dto.request.LoginRequest;
import com.testsite.user.dto.request.RefreshTokenRequest;
import com.testsite.user.dto.request.SignupRequest;
import com.testsite.user.dto.response.TokenResponse;
import com.testsite.user.dto.response.UserResponse;

public interface AuthService {

    UserResponse signup(SignupRequest request);

    TokenResponse login(LoginRequest request);

    TokenResponse refresh(RefreshTokenRequest request);

    void logout(Long userId);
}
