package com.ssafy.archiview.service.common;

import com.ssafy.archiview.dto.company.CompanyDto;
import com.ssafy.archiview.entity.Company;
import com.ssafy.archiview.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommonServiceImpl implements CommonService {
    private final CompanyRepository companyRepository;
    
    @Override
    public List<CompanyDto.listInfo> companyList() {
        List<Company> companies = companyRepository.findAll();
        return companies.stream()
                .map(Company::toListDto)
                .collect(Collectors.toList());
    }
}
