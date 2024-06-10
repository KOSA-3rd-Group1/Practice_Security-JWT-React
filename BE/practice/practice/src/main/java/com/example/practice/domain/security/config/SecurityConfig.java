package com.example.practice.domain.security.config;

import com.example.practice.domain.security.filter.JWTCheckFilter;
import com.example.practice.domain.security.handler.APILoginFailHandler;
import com.example.practice.domain.security.handler.APILoginSuccessHandler;
import com.example.practice.domain.security.handler.CustomAccessDeniedHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/", "/login", "/api/inquiries", "/api/inquiries/**", "/api/member/**", "/api/auth/**").permitAll();
                    auth.anyRequest().authenticated();
                });

        //CORS 설정
        http
                .cors(httpSecurityCorsConfigurer -> {
                    httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
                });

        //CSRF 설정
        http
                .csrf(config -> config.disable());

        //로그인 수행 후 작업 설정
        http
                .formLogin(config -> {
                    config.loginPage("/api/member/login");
                    config.successHandler(new APILoginSuccessHandler());
                    config.failureHandler(new APILoginFailHandler());
                });

        //JWTCheckFilter 추가
        http
                .addFilterBefore(new JWTCheckFilter(),
                        UsernamePasswordAuthenticationFilter.class);    //JWT체크

        //접근 제한 시
        http
                .exceptionHandling(config -> {
                    config.accessDeniedHandler(new CustomAccessDeniedHandler());
                });

        return http.build();
    }

    //CORS 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    //API 서버를 위한 기본 설정 - 비밀번호 암호화 및 검증
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
