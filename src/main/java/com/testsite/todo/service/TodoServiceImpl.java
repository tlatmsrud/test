package com.testsite.todo.service;

import com.testsite.common.exception.BusinessException;
import com.testsite.common.exception.ErrorCode;
import com.testsite.project.domain.Project;
import com.testsite.project.service.ProjectService;
import com.testsite.storage.FileStorageService;
import com.testsite.todo.domain.Todo;
import com.testsite.todo.domain.TodoImage;
import com.testsite.todo.domain.TodoStatus;
import com.testsite.todo.dto.mapper.TodoMapper;
import com.testsite.todo.dto.request.TodoCreateRequest;
import com.testsite.todo.dto.request.TodoStatusRequest;
import com.testsite.todo.dto.request.TodoUpdateRequest;
import com.testsite.todo.dto.response.TodoImageResponse;
import com.testsite.todo.dto.response.TodoResponse;
import com.testsite.todo.dto.response.TodoSummaryResponse;
import com.testsite.todo.repository.TodoRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final ProjectService projectService;
    private final FileStorageService fileStorageService;
    private final TodoMapper todoMapper;

    @Override
    @Transactional
    public TodoResponse create(Long ownerId, TodoCreateRequest request) {
        Project project = projectService.getOwnedEntity(ownerId, request.projectId());
        Todo todo = Todo.create(project, request.title(), request.content(),
                request.startDate(), request.dueDate(), request.status());
        return todoMapper.toResponse(todoRepository.save(todo));
    }

    @Override
    @Transactional
    public TodoResponse update(Long ownerId, Long todoId, TodoUpdateRequest request) {
        Todo todo = getOwnedTodo(ownerId, todoId);
        todo.update(request.title(), request.content(), request.startDate(), request.dueDate(), request.status());
        return todoMapper.toResponse(todo);
    }

    @Override
    @Transactional
    public TodoResponse changeStatus(Long ownerId, Long todoId, TodoStatusRequest request) {
        Todo todo = getOwnedTodo(ownerId, todoId);
        todo.changeStatus(request.status());
        return todoMapper.toResponse(todo);
    }

    @Override
    @Transactional
    public void delete(Long ownerId, Long todoId) {
        Todo todo = getOwnedTodo(ownerId, todoId);
        todo.getImages().forEach(img -> fileStorageService.delete(img.getStoredPath()));
        todoRepository.delete(todo);
    }

    @Override
    public TodoResponse getById(Long ownerId, Long todoId) {
        return todoMapper.toResponse(getOwnedTodo(ownerId, todoId));
    }

    @Override
    public List<TodoSummaryResponse> search(Long ownerId, Long projectId, TodoStatus status, LocalDate from, LocalDate to) {
        return todoRepository.search(ownerId, projectId, status, from, to).stream()
                .map(todoMapper::toSummary)
                .toList();
    }

    @Override
    @Transactional
    public List<TodoImageResponse> uploadImages(Long ownerId, Long todoId, List<MultipartFile> files) {
        Todo todo = getOwnedTodo(ownerId, todoId);
        if (files == null || files.isEmpty()) {
            return List.of();
        }
        return files.stream()
                .map(f -> {
                    FileStorageService.StoredFile stored = fileStorageService.store(f, "todos/" + todoId);
                    TodoImage image = TodoImage.builder()
                            .originalName(f.getOriginalFilename())
                            .storedPath(stored.storedPath())
                            .url(stored.url())
                            .contentType(f.getContentType())
                            .sizeBytes(f.getSize())
                            .build();
                    todo.addImage(image);
                    return image;
                })
                .map(todoMapper::toImageResponse)
                .toList();
    }

    @Override
    @Transactional
    public void deleteImage(Long ownerId, Long todoId, Long imageId) {
        Todo todo = getOwnedTodo(ownerId, todoId);
        TodoImage image = todo.getImages().stream()
                .filter(i -> i.getId().equals(imageId))
                .findFirst()
                .orElseThrow(() -> new BusinessException(ErrorCode.TODO_NOT_FOUND));
        fileStorageService.delete(image.getStoredPath());
        todo.removeImage(image);
    }

    private Todo getOwnedTodo(Long ownerId, Long todoId) {
        Todo todo = todoRepository.findWithImagesById(todoId)
                .orElseThrow(() -> new BusinessException(ErrorCode.TODO_NOT_FOUND));
        if (!todo.getProject().isOwnedBy(ownerId)) {
            throw new BusinessException(ErrorCode.TODO_FORBIDDEN);
        }
        return todo;
    }
}
