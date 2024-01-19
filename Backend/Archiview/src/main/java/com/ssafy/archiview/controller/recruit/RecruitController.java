package com.ssafy.archiview.controller.recruit;

import com.ssafy.archiview.dto.recruit.RecruitDto;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.recruit.RecruitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recruits")
public class RecruitController {
    private final RecruitService service;
    @GetMapping
    public ResponseEntity<Object> recruitDetailList(@RequestParam("date") String date) {
        List<RecruitDto.DetailListResponseDto> responseDto = service.recruitDetailList(date);
        return SuccessResponse.createSuccess(SuccessCode.SELECT_RECRUIT_LIST_SUCCESS, responseDto);
    }
}
