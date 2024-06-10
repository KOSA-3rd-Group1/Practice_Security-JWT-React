package com.example.practice.domain.security.controller;

import com.example.practice.domain.security.util.CustomJWTException;
import com.example.practice.domain.security.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member/refresh")

public class APIRefreshController {

//    @RequestMapping("/api/member/refresh")
    @PostMapping
//    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader, String refreshToken) {
    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader, @RequestBody String refreshToken) {
        log.info("refresh token: {}", refreshToken);
        if (refreshToken == null) {
            throw new CustomJWTException("NULL_REFRESH");
        }

        if (authHeader == null || authHeader.length() < 7) {
            throw new CustomJWTException("INVALID_STRING");
        }

        String accessToken = authHeader.substring(7);
        log.info("refresh access token: {}", accessToken);

        //Access 토큰이 만료되지 않았다면
        if (checkExpiredToken(accessToken) == false) {
            log.info("access token not expired");
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);

        }

        //Access 토큰이 만료되었다면, Refresh 토큰 검증
        Map<String, Object> claims = JWTUtil.validateToken(refreshToken);

        //Refresh 토큰이 만료되지 않았다면
        String newAccessToken = JWTUtil.generateToken(claims, 1);
        String newRefreshToken = checkTime((Integer) claims.get("exp")) == true ?
                JWTUtil.generateToken(claims, 60*24) : refreshToken;

        log.info("access token expired, but refresh token");

        return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
    }

    //시간이 1시간 미만으로 남았다면 true, 아니면 false
    private boolean checkTime (Integer exp) {

        //JWT exp를 날짜로 변환
        java.util.Date expDate = new java.util.Date((long) exp * 1000);

        //현재 시간과의 차이 계산 - ms(밀리세컨즈)
        long gap = expDate.getTime() - System.currentTimeMillis();

        //분 단위 계산
        long leftMin = gap / (1000 * 60);

        //1시간도 안남았는지 확인
        return leftMin < 60;
    }

    //토큰 만료 여부 확인 (만료되었으면 true, 그렇지 않다면 false)
    private boolean checkExpiredToken (String token) {
        try {
            JWTUtil.validateToken(token);
        } catch (CustomJWTException ex) {
            if (ex.getMessage().equals("Expired")) {
                return true;
            }
        }
        return false;
    }
}
