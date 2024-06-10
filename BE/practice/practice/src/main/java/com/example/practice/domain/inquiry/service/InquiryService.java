package com.example.practice.domain.inquiry.service;

import com.example.practice.domain.inquiry.entity.Inquiry;
import com.example.practice.domain.inquiry.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InquiryService {

    @Autowired
    private InquiryRepository inquiryRepository;

    //전체 조회
    public List<Inquiry> getAllInquiry() {
        return inquiryRepository.findAll();
    }

    //단일 조회 - id
    public Inquiry getInquiryById(Long id) {
        return inquiryRepository.findById(id).orElse(null);
    }

    //생성, 수정
    public Inquiry saveInquiry(Inquiry inquiry) {
        return inquiryRepository.save(inquiry);
    }

    //제거
    public void deleteInquiry(Long id) {
        inquiryRepository.deleteById(id);
    }
}
