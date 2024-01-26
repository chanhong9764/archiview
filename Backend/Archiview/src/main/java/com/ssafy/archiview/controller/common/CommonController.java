package com.ssafy.archiview.controller.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.archiview.dto.common.CommonDto;
import com.ssafy.archiview.dto.company.CompanyDto;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.common.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/commons")
public class CommonController {
    private final CommonService commonService;

    @GetMapping("/companies")
    public ResponseEntity<Object> companyList() {
        List<CommonDto.companyResponseDto> responseDto = commonService.companyList();
        return SuccessResponse.createSuccess(SuccessCode.SELECT_COMPANY_LIST_SUCCESS, responseDto);
    }

    @GetMapping("/tags")
    public ResponseEntity<Object> tagList() {
        CommonDto.tagResponseDto responseDto = commonService.tagList();
        return SuccessResponse.createSuccess(SuccessCode.SELECT_TAG_LIST_SUCCESS, responseDto);
    }

    @GetMapping("/search")
    public ResponseEntity<Object> imageSearch(@RequestParam("query") String query){
        CommonDto.SearchResponseDto responseDto = commonService.searchImage(query);
        return SuccessResponse.createSuccess(SuccessCode.SEARCH_IMAGE_SUCCESS, responseDto);
    }
}
