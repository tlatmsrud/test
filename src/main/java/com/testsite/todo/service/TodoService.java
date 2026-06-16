package com.testsite.todo.service;

import com.testsite.todo.domain.TodoStatus;
import com.testsite.todo.dto.request.TodoCreateRequest;
import com.testsite.todo.dto.request.TodoStatusRequest;
import com.testsite.todo.dto.request.TodoUpdateRequest;
import com.testsite.todo.dto.response.TodoImageResponse;
import com.testsite.todo.dto.response.TodoResponse;
import com.testsite.todo.dto.response.TodoSummaryResponse;
import java.time.LocalDate;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface TodoService {

    TodoResponse create(Long ownerId, TodoCreateRequest request);

    TodoResponse update(Long ownerId, Long todoId, TodoUpdateRequest request);

    TodoResponse changeStatus(Long ownerId, Long todoId, TodoStatusRequest request);

    void delete(Long ownerId, Long todoId);

    TodoResponse getById(Long ownerId, Long todoId);

    List<TodoSummaryResponse> search(Long ownerId, Long projectId, TodoStatus status, LocalDate from, LocalDate to);

    List<TodoImageResponse> uploadImages(Long ownerId, Long todoId, List<MultipartFile> files);

    void deleteImage(Long ownerId, Long todoId, Long imageId);
}
