package com.example.practice.web.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/protected-resource")
    public Map<String, String> getProtectedResource() {
        return Map.of("message", "This is a protected resource");
    }
}
