package com.ssafy.archiview.controller.common;

import com.ssafy.archiview.dto.company.CompanyDto;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.common.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/commons")
public class CommonController {
    private final CommonService commonService;

    @GetMapping("/companies")
    public ResponseEntity<Object> companyList() {
        List<CompanyDto.listInfo> responseDto = commonService.companyList();
        return SuccessResponse.createSuccess(SuccessCode.SELECT_COMPANY_LIST_SUCCESS, responseDto);
    }

    @GetMapping("/tags")
    public ResponseEntity<Object> tagList() {
        return SuccessResponse.createSuccess(SuccessCode.SELECT_TAG_LIST_SUCCESS);
    }
}
