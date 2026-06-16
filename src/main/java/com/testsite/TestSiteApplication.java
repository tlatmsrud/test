package com.testsite;

import com.testsite.auth.jwt.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing(dateTimeProviderRef = "offsetDateTimeProvider")
@EnableConfigurationProperties(JwtProperties.class)
@SpringBootApplication
public class TestSiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestSiteApplication.class, args);
    }
}
