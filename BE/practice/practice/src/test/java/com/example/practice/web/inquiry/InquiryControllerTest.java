package com.example.practice.web.inquiry;

import com.example.practice.domain.inquiry.entity.Inquiry;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class InquiryControllerTest {

    @Autowired
    private InquiryController inquiryController;

//    @Test
//    @DisplayName("생성")
    public Inquiry createInquiry() {

        Inquiry inquiry = Inquiry.builder()
                .title("가가가가")
                .content("123123123")
                .build();

//        System.out.println(inquiry.toString());
        return inquiry;
    }

    @Test
    @DisplayName("생성 및 전체 조회")
    public void getAllInquiryTest() {
        inquiryController.createInquiry(createInquiry());
        inquiryController.getAllInquiry().forEach(inquiry -> {
            System.out.println("생성 및 조회 테스트" + inquiry);
        });
    }

    @Test
    @DisplayName("단일 조회")
    public void getInquiryByIdTest () {
        System.out.println(inquiryController.getInquiryById(1L).toString());
    }

    @Test
    @DisplayName("수정")
    public void updateInquiryTest () {
        Inquiry inquiry = Inquiry.builder()
                .title("나나나나")
                .content("다다")
                .build();
        inquiryController.updateInquiry(2L, inquiry);
        System.out.println(inquiryController.getInquiryById(2L).toString());
    }

    @Test
    @DisplayName("삭제")
    public void deleteInquiryTest () {
        inquiryController.getAllInquiry().forEach(inquiry -> {
            System.out.println(inquiry.toString());
        });
        inquiryController.deleteInquiry(1L);
        System.out.println("===================삭제 후==================");
        inquiryController.getAllInquiry().forEach(inquiry -> {
            System.out.println(inquiry.toString());
        });
    }
}