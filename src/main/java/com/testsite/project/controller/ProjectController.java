package com.testsite.project.controller;

import com.testsite.auth.support.LoginUser;
import com.testsite.auth.support.LoginUserDto;
import com.testsite.project.dto.request.ProjectCreateRequest;
import com.testsite.project.dto.request.ProjectUpdateRequest;
import com.testsite.project.dto.response.ProjectResponse;
import com.testsite.project.service.ProjectService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> create(
            @LoginUser LoginUserDto loginUser,
            @Valid @RequestBody ProjectCreateRequest request) {
        ProjectResponse response = projectService.create(loginUser.id(), request);
        return ResponseEntity.created(URI.create("/api/projects/" + response.id())).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> list(@LoginUser LoginUserDto loginUser) {
        return ResponseEntity.ok(projectService.listMine(loginUser.id()));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> get(
            @LoginUser LoginUserDto loginUser,
            @PathVariable Long projectId) {
        return ResponseEntity.ok(projectService.getById(loginUser.id(), projectId));
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> update(
            @LoginUser LoginUserDto loginUser,
            @PathVariable Long projectId,
            @Valid @RequestBody ProjectUpdateRequest request) {
        return ResponseEntity.ok(projectService.update(loginUser.id(), projectId, request));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> delete(
            @LoginUser LoginUserDto loginUser,
            @PathVariable Long projectId) {
        projectService.delete(loginUser.id(), projectId);
        return ResponseEntity.noContent().build();
    }
}
