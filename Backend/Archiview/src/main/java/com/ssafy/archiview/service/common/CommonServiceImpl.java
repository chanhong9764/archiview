package com.ssafy.archiview.service.common;

import com.ssafy.archiview.dto.common.CommonDto;
import com.ssafy.archiview.dto.company.CompanyDto;
import com.ssafy.archiview.entity.Company;
import com.ssafy.archiview.entity.CsMain;
import com.ssafy.archiview.entity.JobMain;
import com.ssafy.archiview.repository.CompanyRepository;
import com.ssafy.archiview.repository.CsMainRepository;
import com.ssafy.archiview.repository.JobMainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        List<CommonDto.csMainDto> csList = csMainRepository.findAll().stream()
                .map(CsMain::toDto)
                .toList();
        List<CommonDto.jobMainDto> jsList = jobMainRepository.findAll().stream()
                .map(JobMain::toDto)
                .toList();
        return CommonDto.tagResponseDto.builder()
                .csList(csList)
                .jsList(jsList)
                .build();
    }
}
