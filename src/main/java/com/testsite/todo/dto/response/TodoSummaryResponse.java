package com.testsite.todo.dto.response;

import com.testsite.todo.domain.TodoStatus;
import java.time.LocalDate;
import java.time.OffsetDateTime;

public record TodoSummaryResponse(
        Long id,
        Long projectId,
        String title,
        LocalDate startDate,
        LocalDate dueDate,
        TodoStatus status,
        OffsetDateTime updatedAt
) {
}
