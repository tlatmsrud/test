package com.testsite.project.domain;

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
import com.testsite.user.domain.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "projects")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Project extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(length = 20)
    private String color;

    @Builder
    private Project(User owner, String name, String description, String color) {
        this.owner = owner;
        this.name = name;
        this.description = description;
        this.color = color;
    }

    public static Project create(User owner, String name, String description, String color) {
        return Project.builder()
                .owner(owner)
                .name(name)
                .description(description)
                .color(color)
                .build();
    }

    public void update(String name, String description, String color) {
        if (name != null) this.name = name;
        if (description != null) this.description = description;
        if (color != null) this.color = color;
    }

    public boolean isOwnedBy(Long userId) {
        return this.owner.getId().equals(userId);
    }
}
