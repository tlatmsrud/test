package com.testsite.todo.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.testsite.todo.domain.QTodo;
import com.testsite.todo.domain.Todo;
import com.testsite.todo.domain.TodoStatus;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TodoRepositoryImpl implements TodoRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Todo> search(Long ownerId, Long projectId, TodoStatus status, LocalDate from, LocalDate to) {
        QTodo todo = QTodo.todo;
        BooleanBuilder where = new BooleanBuilder();
        where.and(todo.project.owner.id.eq(ownerId));
        if (projectId != null) where.and(todo.project.id.eq(projectId));
        if (status != null) where.and(todo.status.eq(status));
        if (from != null) where.and(todo.dueDate.goe(from).or(todo.dueDate.isNull()));
        if (to != null) where.and(todo.startDate.loe(to).or(todo.startDate.isNull()));

        return queryFactory.selectFrom(todo)
                .leftJoin(todo.project).fetchJoin()
                .where(where)
                .orderBy(todo.createdAt.desc())
                .fetch();
    }
}
