package com.testsite.project.dto.request;

import jakarta.validation.constraints.Size;

public record ProjectUpdateRequest(
        @Size(max = 100) String name,
        @Size(max = 500) String description,
        @Size(max = 20) String color
) {
}
