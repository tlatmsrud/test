package com.testsite.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // Common
    INVALID_INPUT(HttpStatus.BAD_REQUEST, "C001", "잘못된 요청입니다."),
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C002", "서버 오류가 발생했습니다."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "C003", "허용되지 않은 HTTP 메서드입니다."),
    UNSUPPORTED_MEDIA_TYPE(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "C004", "지원하지 않는 Content-Type 입니다."),
    MALFORMED_REQUEST(HttpStatus.BAD_REQUEST, "C005", "요청 본문을 해석할 수 없습니다."),

    // Auth / User
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U001", "사용자를 찾을 수 없습니다."),
    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "U002", "이미 가입된 이메일입니다."),
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "U003", "이메일 또는 비밀번호가 일치하지 않습니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "U004", "인증이 필요합니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "U005", "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "U006", "만료된 토큰입니다."),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "U007", "리프레시 토큰을 찾을 수 없습니다."),

    // Project
    PROJECT_NOT_FOUND(HttpStatus.NOT_FOUND, "P001", "프로젝트를 찾을 수 없습니다."),
    PROJECT_FORBIDDEN(HttpStatus.FORBIDDEN, "P002", "해당 프로젝트에 접근 권한이 없습니다."),

    // Todo
    TODO_NOT_FOUND(HttpStatus.NOT_FOUND, "T001", "할 일을 찾을 수 없습니다."),
    TODO_FORBIDDEN(HttpStatus.FORBIDDEN, "T002", "해당 할 일에 접근 권한이 없습니다."),
    INVALID_DATE_RANGE(HttpStatus.BAD_REQUEST, "T003", "마감일은 시작일 이후여야 합니다."),

    // File
    FILE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "F001", "파일 업로드에 실패했습니다."),
    UNSUPPORTED_FILE_TYPE(HttpStatus.BAD_REQUEST, "F002", "지원하지 않는 파일 형식입니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
