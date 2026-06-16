package com.testsite.todo.dto.request;

import com.testsite.todo.domain.TodoStatus;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record TodoUpdateRequest(
        @Size(max = 200) String title,
        String content,
        LocalDate startDate,
        LocalDate dueDate,
        TodoStatus status
) {
}
