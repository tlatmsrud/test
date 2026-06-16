package com.testsite.todo.dto.response;

import com.testsite.todo.domain.TodoStatus;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

public record TodoResponse(
        Long id,
        Long projectId,
        String title,
        String content,
        LocalDate startDate,
        LocalDate dueDate,
        TodoStatus status,
        List<TodoImageResponse> images,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
}
