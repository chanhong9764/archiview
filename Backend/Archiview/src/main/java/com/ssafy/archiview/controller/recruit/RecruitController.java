package com.ssafy.archiview.controller.recruit;

import com.querydsl.core.BooleanBuilder;
import com.ssafy.archiview.dto.recruit.RecruitDto;
import com.ssafy.archiview.entity.Recruit;
import com.ssafy.archiview.response.code.SuccessCode;
import com.ssafy.archiview.response.structure.SuccessResponse;
import com.ssafy.archiview.service.recruit.RecruitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recruits")
public class RecruitController {
    private final RecruitService service;
    @GetMapping
    public ResponseEntity<Object> recruitDetailList(@RequestParam("date") String date,
                                                    @RequestParam(value = "company", required = false, defaultValue = "0") int id
    ) {
        RecruitDto.DetailListRequestDto requestDto = RecruitDto.DetailListRequestDto.builder()
                .date(date.substring(0, 7))
                .companyId(id).build();

        List<RecruitDto.DetailListResponseDto> responseDto = service.recruitDetailList(requestDto);
        return SuccessResponse.createSuccess(SuccessCode.SELECT_RECRUIT_LIST_SUCCESS, responseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> recruitDetail(@PathVariable("id") int id) {
        RecruitDto.DetailResponseDto responseDto = service.recruitDetail(id);
        return SuccessResponse.createSuccess(SuccessCode.SELECT_RECRUIT_SUCCESS, responseDto);
    }
}
