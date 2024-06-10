package com.example.practice.domain.member.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Entity
public class Member {
    @Id
    private String email;
    private String pw;
    private String nickname;
    private boolean social;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();

    public void addRole(MemberRole memberRole) {
        memberRoleList.add(memberRole);
    }
    public void clearRole(MemberRole memberRole) {
        memberRoleList.clear();
    }
    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }
    public void changePw(String pw) {
        this.pw = pw;
    }
    public void changeSocial(boolean social) {
        this.social = social;
    }

}
