package com.testsite.user.controller;

import com.testsite.auth.support.LoginUser;
import com.testsite.auth.support.LoginUserDto;
import com.testsite.user.dto.response.UserResponse;
import com.testsite.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(@LoginUser LoginUserDto loginUser) {
        return ResponseEntity.ok(userService.getById(loginUser.id()));
    }
}
