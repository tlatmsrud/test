package com.testsite.storage;

import com.testsite.common.exception.BusinessException;
import com.testsite.common.exception.ErrorCode;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
public class LocalFileStorageService implements FileStorageService {

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg", "image/png", "image/gif", "image/webp");

    private final Path rootDir;
    private final String publicBaseUrl;

    public LocalFileStorageService(
            @Value("${testsite.storage.upload-dir}") String uploadDir,
            @Value("${testsite.storage.public-base-url}") String publicBaseUrl) {
        this.rootDir = Paths.get(uploadDir).toAbsolutePath().normalize();
        this.publicBaseUrl = publicBaseUrl.endsWith("/") ? publicBaseUrl.substring(0, publicBaseUrl.length() - 1) : publicBaseUrl;
    }

    @PostConstruct
    void init() {
        try {
            Files.createDirectories(rootDir);
            log.info("File upload root: {}", rootDir);
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.FILE_UPLOAD_FAILED, e);
        }
    }

    @Override
    public StoredFile store(MultipartFile file, String subdirectory) {
        if (file == null || file.isEmpty()) {
            throw new BusinessException(ErrorCode.FILE_UPLOAD_FAILED, "빈 파일입니다.");
        }
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType.toLowerCase())) {
            throw new BusinessException(ErrorCode.UNSUPPORTED_FILE_TYPE);
        }

        String ext = extractExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID().toString().replace("-", "") + ext;
        String rel = (subdirectory == null || subdirectory.isBlank() ? "" : subdirectory + "/") + filename;
        Path target = rootDir.resolve(rel).normalize();
        if (!target.startsWith(rootDir)) {
            throw new BusinessException(ErrorCode.FILE_UPLOAD_FAILED, "잘못된 저장 경로입니다.");
        }

        try {
            Files.createDirectories(target.getParent());
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.FILE_UPLOAD_FAILED, e);
        }

        String url = publicBaseUrl + "/" + rel;
        return new StoredFile(rel, url);
    }

    @Override
    public void delete(String storedPath) {
        if (storedPath == null || storedPath.isBlank()) return;
        Path target = rootDir.resolve(storedPath).normalize();
        if (!target.startsWith(rootDir)) return;
        try {
            Files.deleteIfExists(target);
        } catch (IOException e) {
            log.warn("파일 삭제 실패 path={}", target, e);
        }
    }

    private String extractExtension(String originalName) {
        String cleaned = StringUtils.cleanPath(originalName == null ? "" : originalName);
        int dot = cleaned.lastIndexOf('.');
        if (dot < 0 || dot == cleaned.length() - 1) return "";
        return cleaned.substring(dot).toLowerCase();
    }
}
