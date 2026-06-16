package com.testsite.project.service;

import com.testsite.project.domain.Project;
import com.testsite.project.dto.request.ProjectCreateRequest;
import com.testsite.project.dto.request.ProjectUpdateRequest;
import com.testsite.project.dto.response.ProjectResponse;
import java.util.List;

public interface ProjectService {

    ProjectResponse create(Long ownerId, ProjectCreateRequest request);

    ProjectResponse update(Long ownerId, Long projectId, ProjectUpdateRequest request);

    void delete(Long ownerId, Long projectId);

    ProjectResponse getById(Long ownerId, Long projectId);

    List<ProjectResponse> listMine(Long ownerId);

    /**
     * 다른 도메인(Todo 등)에서 소유권 검증 후 엔티티가 필요할 때 사용.
     */
    Project getOwnedEntity(Long ownerId, Long projectId);
}
