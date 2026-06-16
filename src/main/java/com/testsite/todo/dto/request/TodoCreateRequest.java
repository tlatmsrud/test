package com.testsite.todo.dto.request;

import com.testsite.todo.domain.TodoStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record TodoCreateRequest(
        @NotNull Long projectId,
        @NotBlank @Size(max = 200) String title,
        String content,
        LocalDate startDate,
        LocalDate dueDate,
        TodoStatus status
) {
}
