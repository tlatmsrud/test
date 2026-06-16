package com.testsite.todo.dto.request;

import com.testsite.todo.domain.TodoStatus;
import jakarta.validation.constraints.NotNull;

public record TodoStatusRequest(@NotNull TodoStatus status) {
}
