package com.testsite.todo.dto.response;

public record TodoImageResponse(
        Long id,
        String originalName,
        String url,
        String contentType,
        long sizeBytes
) {
}
