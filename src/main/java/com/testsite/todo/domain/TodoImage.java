package com.testsite.todo.domain;

import com.testsite.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "todo_images")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodoImage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "todo_id", nullable = false)
    private Todo todo;

    @Column(name = "original_name", nullable = false, length = 255)
    private String originalName;

    @Column(name = "stored_path", nullable = false, length = 500)
    private String storedPath;

    @Column(name = "url", nullable = false, length = 1000)
    private String url;

    @Column(name = "content_type", length = 100)
    private String contentType;

    @Column(name = "size_bytes", nullable = false)
    private long sizeBytes;

    @Builder
    private TodoImage(String originalName, String storedPath, String url, String contentType, long sizeBytes) {
        this.originalName = originalName;
        this.storedPath = storedPath;
        this.url = url;
        this.contentType = contentType;
        this.sizeBytes = sizeBytes;
    }

    void attachTo(Todo todo) {
        this.todo = todo;
    }
}
