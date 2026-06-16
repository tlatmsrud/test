package com.testsite.project.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.testsite.project.domain.Project;
import com.testsite.project.domain.QProject;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ProjectRepositoryImpl implements ProjectRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Project> findAllByOwnerOrderByCreated(Long ownerId) {
        QProject project = QProject.project;
        return queryFactory.selectFrom(project)
                .where(project.owner.id.eq(ownerId))
                .orderBy(project.createdAt.desc())
                .fetch();
    }
}
