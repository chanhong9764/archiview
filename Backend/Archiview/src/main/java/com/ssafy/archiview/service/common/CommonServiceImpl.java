package com.ssafy.archiview.service.common;

<<<<<<< HEAD
import com.ssafy.archiview.dto.common.CommonDto;
import com.ssafy.archiview.entity.Company;
import com.ssafy.archiview.entity.CsMain;
import com.ssafy.archiview.repository.CompanyRepository;
import com.ssafy.archiview.repository.CsMain.CsMainRepository;
import com.ssafy.archiview.repository.JobMain.JobMainRepository;
=======
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.ssafy.archiview.dto.common.CommonDto;
import com.ssafy.archiview.dto.company.CompanyDto;
import com.ssafy.archiview.entity.Company;
import com.ssafy.archiview.entity.CsMain;
import com.ssafy.archiview.entity.JobMain;
import com.ssafy.archiview.repository.CompanyRepository;
import com.ssafy.archiview.repository.CsMainRepository;
import com.ssafy.archiview.repository.JobMainRepository;
import com.ssafy.archiview.response.code.ErrorCode;
import com.ssafy.archiview.response.exception.RestApiException;
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
<<<<<<< HEAD
=======
import java.util.Map;
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommonServiceImpl implements CommonService {
    private final CompanyRepository companyRepository;
    private final CsMainRepository csMainRepository;
    private final JobMainRepository jobMainRepository;

    @Override
    public List<CommonDto.companyResponseDto> companyList() {
        List<Company> companies = companyRepository.findAll();
        return companies.stream()
                .map(Company::toListDto)
                .collect(Collectors.toList());
    }

    @Override
    public CommonDto.tagResponseDto tagList() {
<<<<<<< HEAD
        List<CommonDto.csMainDto> csList = csMainRepository.getCsTagList();
        List<CommonDto.jobMainDto> jsList = jobMainRepository.getJobTagList();

=======
        List<CommonDto.csMainDto> csList = csMainRepository.findAll().stream()
                .map(CsMain::toDto)
                .toList();
        List<CommonDto.jobMainDto> jsList = jobMainRepository.findAll().stream()
                .map(JobMain::toDto)
                .toList();
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
        return CommonDto.tagResponseDto.builder()
                .csList(csList)
                .jsList(jsList)
                .build();
    }

    @Override
    public CommonDto.SearchResponseDto searchImage(String query) {
        WebClient webClient = WebClient.builder()
                .baseUrl("https://openapi.naver.com/v1/search/image")
                .defaultHeader("X-Naver-Client-Id", "vDZwnjUq2L0ecmGLqTDE")
                .defaultHeader("X-Naver-Client-Secret", "AFfmYdxuEK")
                .build();
        CommonDto.SearchResponse response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("display", 1)
                        .queryParam("query", query)
                        .build())
                .retrieve()
                .bodyToMono(CommonDto.SearchResponse.class)
                .block();
<<<<<<< HEAD
=======
        System.out.println();
>>>>>>> a6a80dda1c780000130ad95aff2210526ca9497a
        return new CommonDto.SearchResponseDto(response.getItems().get(0).getThumbnail());
    }
}
