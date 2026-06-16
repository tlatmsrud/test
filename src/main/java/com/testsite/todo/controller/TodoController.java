package com.testsite.todo.controller;

import com.testsite.auth.support.LoginUser;
import com.testsite.auth.support.LoginUserDto;
import com.testsite.todo.domain.TodoStatus;
import com.testsite.todo.dto.request.TodoCreateRequest;
import com.testsite.todo.dto.request.TodoStatusRequest;
import com.testsite.todo.dto.request.TodoUpdateRequest;
import com.testsite.todo.dto.response.TodoImageResponse;
import com.testsite.todo.dto.response.TodoResponse;
import com.testsite.todo.dto.response.TodoSummaryResponse;
import com.testsite.todo.service.TodoService;
import jakarta.validation.Valid;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoResponse> create(
            @LoginUser LoginUserDto loginUser,
            @Valid @RequestBody TodoCreateRequest request) {
        TodoResponse response = todoService.create(loginUser.id(), request);
        return ResponseEntity.created(URI.create("/api/todos/" + response.id())).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TodoSummaryResponse>> search(
            @LoginUser LoginUserDto loginUser,
            @RequestParam(required = false) Long projectId,
            @RequestParam(required = false) TodoStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(todoService.search(loginUser.id(), projectId, status, from, to));
    }

    @GetMapping("/{todoId}")
    public ResponseEntity<TodoResponse> get(
            @LoginUser LoginUserDto loginUser,
            @PathVariable Long todoId) {
        return ResponseEntity.ok(todoService.getById(loginUser.id(), todoId));
    }

    @PatchMapping("/{todoId}")
    public ResponseEntity<TodoResponse> update(
            @LoginUser LoginUserDto loginUser,
            @PathVariable Long todoId,
            @Valid @RequestBody TodoUpdateRequest request) {
        return ResponseEntity.ok(todoService.update(loginUser.id(), todoId, request));
    }

    @PatchMapping("/{todoId}/status")
    public ResponseEntity<TodoResponse> changeStatus(
            @LoginUser LoginUserDto loginUser,
            @PathVariable Long todoId,
            @Valid @RequestBody TodoStatusRequest request) {
        return ResponseEntity.ok(todoService.changeStatus(loginUser.id(), todoId, request));
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<Void> delete(
            @LoginUser LoginUserDto loginUser,
            @PathVariable Long todoId) {
        todoService.delete(loginUser.id(), todoId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/{todoId}/images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<TodoImageResponse>> uploadImages(
            @LoginUser LoginUserDto loginUser,
            @PathVariable Long todoId,
            @RequestPart("files") List<MultipartFile> files) {
        return ResponseEntity.ok(todoService.uploadImages(loginUser.id(), todoId, files));
    }

    @DeleteMapping("/{todoId}/images/{imageId}")
    public ResponseEntity<Void> deleteImage(
            @LoginUser LoginUserDto loginUser,
            @PathVariable Long todoId,
            @PathVariable Long imageId) {
        todoService.deleteImage(loginUser.id(), todoId, imageId);
        return ResponseEntity.noContent().build();
    }
}
