package com.testsite.todo.dto.mapper;

import com.testsite.todo.domain.Todo;
import com.testsite.todo.domain.TodoImage;
import com.testsite.todo.dto.response.TodoImageResponse;
import com.testsite.todo.dto.response.TodoResponse;
import com.testsite.todo.dto.response.TodoSummaryResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TodoMapper {

    @Mapping(source = "project.id", target = "projectId")
    TodoResponse toResponse(Todo todo);

    @Mapping(source = "project.id", target = "projectId")
    TodoSummaryResponse toSummary(Todo todo);

    TodoImageResponse toImageResponse(TodoImage image);
}
