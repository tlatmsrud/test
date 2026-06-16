package com.testsite.user.dto.response;

import com.testsite.user.domain.UserRole;
import java.time.OffsetDateTime;

public record UserResponse(
        Long id,
        String email,
        String name,
        UserRole role,
        OffsetDateTime createdAt
) {
}
