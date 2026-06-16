package com.testsite.project.dto.mapper;

import com.testsite.project.domain.Project;
import com.testsite.project.dto.response.ProjectResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    @Mapping(source = "owner.id", target = "ownerId")
    ProjectResponse toResponse(Project project);
}
