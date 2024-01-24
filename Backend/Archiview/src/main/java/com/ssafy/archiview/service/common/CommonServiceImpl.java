package com.####.archiview.service.common;

import com.####.archiview.dto.company.CompanyDto;
import com.####.archiview.entity.Company;
import com.####.archiview.repository.CompanyRepository;
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
