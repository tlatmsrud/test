package com.testsite.user.dto.mapper;

import com.testsite.user.domain.User;
import com.testsite.user.dto.response.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User user);
}
