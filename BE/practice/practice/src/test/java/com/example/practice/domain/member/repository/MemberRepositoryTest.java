package com.example.practice.domain.member.repository;

import com.example.practice.domain.member.entity.Member;
import com.example.practice.domain.member.entity.MemberRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //엔티티의 등록
    @Test
    public void insertMemberTest() {
        for (int i = 0; i < 10; i++) {

            Member member = Member.builder()
                    .email("user"+i+"@test.com")
                    .pw(passwordEncoder.encode("1111"))
                    .nickname("USER"+i)
                    .build();
            member.addRole(MemberRole.USER);
            if (i == 9) {
                member.addRole(MemberRole.ADMIN);
            }
            memberRepository.save(member);

        }
    }

    //멤버 전체 조회
    @Test
    public void getAllWithRolesTest() {

        memberRepository.getAllWithRoles().forEach(System.out::println);
    }

    //엔티티 조회 (email)
    @Test
    public void getWithRolesTest() {
        String email = "user9@test.com";
        Member member = memberRepository.getWithRoles(email)
                .orElse(null);
        System.out.println(member);
    }

}