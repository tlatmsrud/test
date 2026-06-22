package com.testsite.project.service;

import com.testsite.common.exception.BusinessException;
import com.testsite.common.exception.ErrorCode;
import com.testsite.project.domain.Project;
import com.testsite.project.dto.mapper.ProjectMapper;
import com.testsite.project.dto.request.ProjectCreateRequest;
import com.testsite.project.dto.request.ProjectUpdateRequest;
import com.testsite.project.dto.response.ProjectResponse;
import com.testsite.project.repository.ProjectRepository;
import com.testsite.todo.repository.TodoRepository;
import com.testsite.user.domain.User;
import com.testsite.user.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final UserService userService;
    private final TodoRepository todoRepository;

    @Override
    @Transactional
    public ProjectResponse create(Long ownerId, ProjectCreateRequest request) {
        User owner = userService.getEntity(ownerId);
        Project project = Project.create(owner, request.name(), request.description(), request.color());
        return projectMapper.toResponse(projectRepository.save(project));
    }

    @Override
    @Transactional
    public ProjectResponse update(Long ownerId, Long projectId, ProjectUpdateRequest request) {
        Project project = getOwnedEntity(ownerId, projectId);
        project.update(request.name(), request.description(), request.color());
        return projectMapper.toResponse(project);
    }

    @Override
    @Transactional
    public void delete(Long ownerId, Long projectId) {
        Project project = getOwnedEntity(ownerId, projectId);
        todoRepository.deleteAll(todoRepository.findAllByProjectId(projectId));
        projectRepository.delete(project);
    }

    @Override
    public ProjectResponse getById(Long ownerId, Long projectId) {
        return projectMapper.toResponse(getOwnedEntity(ownerId, projectId));
    }

    @Override
    public List<ProjectResponse> listMine(Long ownerId) {
        return projectRepository.findAllByOwnerOrderByCreated(ownerId).stream()
                .map(projectMapper::toResponse)
                .toList();
    }

    @Override
    public Project getOwnedEntity(Long ownerId, Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PROJECT_NOT_FOUND));
        if (!project.isOwnedBy(ownerId)) {
            throw new BusinessException(ErrorCode.PROJECT_FORBIDDEN);
        }
        return project;
    }
}
