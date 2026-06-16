package com.testsite.project.repository;

import com.testsite.project.domain.Project;
import java.util.List;

public interface ProjectRepositoryCustom {

    List<Project> findAllByOwnerOrderByCreated(Long ownerId);
}
