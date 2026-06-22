package com.testsite.todo.repository;

import com.testsite.todo.domain.Todo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long>, TodoRepositoryCustom {

    @EntityGraph(attributePaths = {"project", "images"})
    Optional<Todo> findWithImagesById(Long id);

    List<Todo> findAllByProjectId(Long projectId);
}
