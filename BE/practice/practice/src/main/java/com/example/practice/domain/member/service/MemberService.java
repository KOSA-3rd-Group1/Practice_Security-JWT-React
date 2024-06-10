package com.example.practice.domain.member.service;

import com.example.practice.domain.member.entity.Member;
import com.example.practice.domain.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    //전체 조회
    public List<Member> getAllMembers() {
        return memberRepository.getAllWithRoles();
    }

    //단일 조회 - email
    public Member getMemberByEmail(String email) {
        return memberRepository.getWithRoles(email).orElse(null);
    }

    //생성, 수정
    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }
}
