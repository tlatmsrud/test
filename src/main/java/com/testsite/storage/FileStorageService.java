package com.testsite.storage;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    StoredFile store(MultipartFile file, String subdirectory);

    void delete(String storedPath);

    record StoredFile(String storedPath, String url) {
    }
}
