package com.testsite.todo.domain;

import com.testsite.common.entity.BaseEntity;
import com.testsite.common.exception.BusinessException;
import com.testsite.common.exception.ErrorCode;
import com.testsite.project.domain.Project;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "todos")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TodoStatus status;

    @OneToMany(mappedBy = "todo", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("id ASC")
    private List<TodoImage> images = new ArrayList<>();

    @Builder
    private Todo(Project project, String title, String content, LocalDate startDate, LocalDate dueDate, TodoStatus status) {
        this.project = project;
        this.title = title;
        this.content = content;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.status = status;
    }

    public static Todo create(Project project, String title, String content, LocalDate startDate, LocalDate dueDate, TodoStatus status) {
        validateDateRange(startDate, dueDate);
        return Todo.builder()
                .project(project)
                .title(title)
                .content(content)
                .startDate(startDate)
                .dueDate(dueDate)
                .status(status == null ? TodoStatus.TODO : status)
                .build();
    }

    public void update(String title, String content, LocalDate startDate, LocalDate dueDate, TodoStatus status) {
        LocalDate newStart = startDate != null ? startDate : this.startDate;
        LocalDate newDue = dueDate != null ? dueDate : this.dueDate;
        validateDateRange(newStart, newDue);
        if (title != null) this.title = title;
        if (content != null) this.content = content;
        if (startDate != null) this.startDate = startDate;
        if (dueDate != null) this.dueDate = dueDate;
        if (status != null) this.status = status;
    }

    public void changeStatus(TodoStatus status) {
        this.status = status;
    }

    public void addImage(TodoImage image) {
        this.images.add(image);
        image.attachTo(this);
    }

    public void removeImage(TodoImage image) {
        this.images.remove(image);
    }

    public List<TodoImage> getImages() {
        return Collections.unmodifiableList(images);
    }

    private static void validateDateRange(LocalDate start, LocalDate due) {
        if (start != null && due != null && due.isBefore(start)) {
            throw new BusinessException(ErrorCode.INVALID_DATE_RANGE);
        }
    }
}
