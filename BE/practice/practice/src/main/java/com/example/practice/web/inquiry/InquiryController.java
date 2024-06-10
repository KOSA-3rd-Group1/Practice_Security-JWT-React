package com.example.practice.web.inquiry;

import com.example.practice.domain.inquiry.entity.Inquiry;
import com.example.practice.domain.inquiry.service.InquiryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    @Autowired
    private InquiryService inquiryService;

    //GET
    //전체 조회
    @GetMapping
    public List<Inquiry> getAllInquiry() {
        log.info("getAllInquiry");
        return inquiryService.getAllInquiry();
    }

    //단일 조회
    @GetMapping("/{id}")
    public Inquiry getInquiryById(@PathVariable Long id) {
        return inquiryService.getInquiryById(id);
    }

    //POST
    //생성
    @PostMapping
    public Inquiry createInquiry(@RequestBody Inquiry inquiry) {
        return inquiryService.saveInquiry(inquiry);
    }

    //PUT
    //수정
    @PutMapping("/{id}")
    public Inquiry updateInquiry(@PathVariable Long id, @RequestBody Inquiry inquiry) {
        Inquiry existingInquiry = inquiryService.getInquiryById(id);

        if (existingInquiry == null) {
            return null;
        }

        existingInquiry.setTitle(inquiry.getTitle());
        existingInquiry.setContent(inquiry.getContent());
        return inquiryService.saveInquiry(existingInquiry);
    }

    //DELETE
    @DeleteMapping("/{id}")
    public void deleteInquiry(@PathVariable Long id) {
        inquiryService.deleteInquiry(id);
    }
}
