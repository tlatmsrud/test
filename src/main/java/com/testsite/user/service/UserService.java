package com.testsite.user.service;

import com.testsite.user.domain.User;
import com.testsite.user.dto.response.UserResponse;

public interface UserService {

    UserResponse getById(Long id);

    User getEntity(Long id);
}
