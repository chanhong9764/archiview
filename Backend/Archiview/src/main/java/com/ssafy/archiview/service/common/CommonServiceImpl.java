package com.####.archiview.service.common;

import com.####.archiview.dto.common.CommonDto;
import com.####.archiview.dto.company.CompanyDto;
import com.####.archiview.entity.Company;
import com.####.archiview.entity.CsMain;
import com.####.archiview.entity.JobMain;
import com.####.archiview.repository.CompanyRepository;
import com.####.archiview.repository.CsMainRepository;
import com.####.archiview.repository.JobMainRepository;
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
