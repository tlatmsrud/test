package com.testsite.todo.repository;

import com.testsite.todo.domain.Todo;
import com.testsite.todo.domain.TodoStatus;
import java.time.LocalDate;
import java.util.List;

public interface TodoRepositoryCustom {

    List<Todo> search(Long ownerId, Long projectId, TodoStatus status, LocalDate from, LocalDate to);
}
