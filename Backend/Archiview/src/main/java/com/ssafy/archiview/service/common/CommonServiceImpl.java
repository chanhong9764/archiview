package com.ssafy.archiview.service.common;

import com.ssafy.archiview.dto.common.CommonDto;
import com.ssafy.archiview.entity.Company;
import com.ssafy.archiview.entity.CsMain;
import com.ssafy.archiview.repository.CompanyRepository;
import com.ssafy.archiview.repository.CsMain.CsMainRepository;
import com.ssafy.archiview.repository.JobMain.JobMainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
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
        List<CommonDto.csMainDto> csList = csMainRepository.getCsTagList();
        List<CommonDto.jobMainDto> jsList = jobMainRepository.getJobTagList();

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
        return new CommonDto.SearchResponseDto(response.getItems().get(0).getThumbnail());
    }
}
