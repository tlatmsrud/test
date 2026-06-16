package com.testsite.user.service;

import com.testsite.common.exception.BusinessException;
import com.testsite.common.exception.ErrorCode;
import com.testsite.user.domain.User;
import com.testsite.user.dto.mapper.UserMapper;
import com.testsite.user.dto.response.UserResponse;
import com.testsite.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponse getById(Long id) {
        return userMapper.toResponse(getEntity(id));
    }

    @Override
    public User getEntity(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }
}
