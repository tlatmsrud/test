package com.testsite.auth.controller;

import com.testsite.auth.service.AuthService;
import com.testsite.auth.support.LoginUser;
import com.testsite.auth.support.LoginUserDto;
import com.testsite.user.dto.request.LoginRequest;
import com.testsite.user.dto.request.RefreshTokenRequest;
import com.testsite.user.dto.request.SignupRequest;
import com.testsite.user.dto.response.TokenResponse;
import com.testsite.user.dto.response.UserResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    //ㅅㄷㄴㅅ
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@Valid @RequestBody SignupRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refresh(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@LoginUser LoginUserDto loginUser) {
        authService.logout(loginUser.id());
        return ResponseEntity.noContent().build();
    }
}
