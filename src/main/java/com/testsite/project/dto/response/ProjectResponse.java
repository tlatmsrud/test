package com.testsite.project.dto.response;

import java.time.OffsetDateTime;

public record ProjectResponse(
        Long id,
        Long ownerId,
        String name,
        String description,
        String color,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
}
