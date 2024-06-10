package com.example.practice.domain.security.handler;

import com.example.practice.domain.member.dto.MemberDTO;
import com.example.practice.domain.security.util.JWTUtil;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

public class APILoginSuccessHandler implements AuthenticationSuccessHandler {

    //로그인 성공시 JSON 결과를 전송
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        MemberDTO memberDTO = (MemberDTO) authentication.getPrincipal();
        Map<String, Object> claims = memberDTO.getClaims();

        //로그인 성공 시 JWT 토큰 생성
        String accessToken = JWTUtil.generateToken(claims, 1);
        String refreshToken = JWTUtil.generateToken(claims, 60*24);

        //생성한 JWT 토큰을 클라이언트에게 JSON 형태로 반환
        claims.put("accessToken", accessToken);
        claims.put("refreshToken", refreshToken);

        Gson gson = new Gson();
        String json = gson.toJson(claims);
        response.setContentType("application/json");

        PrintWriter printWriter = response.getWriter();
        printWriter.print(json);
        printWriter.close();
    }
}
