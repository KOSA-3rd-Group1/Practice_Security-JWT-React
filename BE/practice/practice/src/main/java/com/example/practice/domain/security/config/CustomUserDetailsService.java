package com.example.practice.domain.security.config;

import com.example.practice.domain.member.dto.MemberDTO;
import com.example.practice.domain.member.entity.Member;
import com.example.practice.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Member member = memberRepository.getWithRoles(username)
                .orElseThrow(() -> new UsernameNotFoundException("Not Found"));

//        Member member = memberRepository.getWithRoles(username);
//        if (member == null) {
//            throw new UsernameNotFoundException("Not Found");
//        }

        MemberDTO memberDTO = new MemberDTO(
                member.getEmail(),
                member.getPw(),
                member.getNickname(),
                member.isSocial(),
                member.getMemberRoleList().stream()
                        .map(memberRole -> memberRole.name()).collect(Collectors.toList()));

        return memberDTO;
    }
}
