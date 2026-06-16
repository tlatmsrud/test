package com.testsite.todo;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import com.testsite.auth.refresh.RefreshToken;
import com.testsite.auth.refresh.RefreshTokenRepository;
import com.testsite.support.IntegrationTestSupport;
import com.testsite.user.dto.request.LoginRequest;
import com.testsite.user.dto.request.SignupRequest;
import com.testsite.user.dto.response.TokenResponse;
import com.testsite.user.dto.response.UserResponse;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@DisplayName("Todo 플로우 통합 테스트")
class TodoFlowIntegrationTest extends IntegrationTestSupport {

    @LocalServerPort
    int port;

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    private final RestTemplate rest = new RestTemplate();

    @Test
    @DisplayName("회원가입 → 로그인 → 프로젝트 생성 → Todo 생성 → 상세조회까지 정상 동작한다")
    void signup_login_project_todo_flow() {
        // given - refresh repo stub (Redis 없이 동작)
        given(refreshTokenRepository.save(any(RefreshToken.class))).willAnswer(inv -> inv.getArgument(0));
        given(refreshTokenRepository.findById(anyString())).willAnswer(inv -> Optional.empty());

        String base = "http://localhost:" + port;

        // when - signup
        ResponseEntity<UserResponse> signup = rest.postForEntity(base + "/api/auth/signup",
                new SignupRequest("user@test.com", "password1!", "테스터"), UserResponse.class);
        assertThat(signup.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(signup.getBody().email()).isEqualTo("user@test.com");

        // when - login
        ResponseEntity<TokenResponse> login = rest.postForEntity(base + "/api/auth/login",
                new LoginRequest("user@test.com", "password1!"), TokenResponse.class);
        assertThat(login.getStatusCode()).isEqualTo(HttpStatus.OK);
        String accessToken = login.getBody().accessToken();
        assertThat(accessToken).isNotBlank();

        HttpHeaders authHeaders = new HttpHeaders();
        authHeaders.setBearerAuth(accessToken);
        authHeaders.setContentType(MediaType.APPLICATION_JSON);

        // when - create project
        ResponseEntity<Map> projectRes = rest.exchange(base + "/api/projects", HttpMethod.POST,
                new HttpEntity<>(Map.of("name", "내 프로젝트", "color", "#ff0000"), authHeaders), Map.class);
        assertThat(projectRes.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Long projectId = ((Number) projectRes.getBody().get("id")).longValue();

        // when - create todo
        Map<String, Object> todoBody = Map.of(
                "projectId", projectId,
                "title", "첫 번째 할 일",
                "content", "설명",
                "startDate", LocalDate.now().toString(),
                "dueDate", LocalDate.now().plusDays(3).toString(),
                "status", "TODO");
        ResponseEntity<Map> todoRes = rest.exchange(base + "/api/todos", HttpMethod.POST,
                new HttpEntity<>(todoBody, authHeaders), Map.class);
        assertThat(todoRes.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        Long todoId = ((Number) todoRes.getBody().get("id")).longValue();

        // when - get todo detail
        ResponseEntity<Map> detail = rest.exchange(base + "/api/todos/" + todoId, HttpMethod.GET,
                new HttpEntity<>(authHeaders), Map.class);
        assertThat(detail.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(detail.getBody().get("title")).isEqualTo("첫 번째 할 일");
        assertThat(detail.getBody().get("projectId")).isEqualTo(projectId.intValue());

        // when - list todos
        ResponseEntity<Object[]> list = rest.exchange(base + "/api/todos?projectId=" + projectId, HttpMethod.GET,
                new HttpEntity<>(authHeaders), Object[].class);
        assertThat(list.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(list.getBody()).hasSize(1);
    }
}
