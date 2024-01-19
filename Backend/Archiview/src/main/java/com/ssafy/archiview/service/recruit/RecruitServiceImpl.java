package com.####.archiview.service.recruit;

import com.####.archiview.dto.recruit.RecruitDto;
import com.####.archiview.entity.Recruit;
import com.####.archiview.repository.RecruitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecruitServiceImpl implements RecruitService {
    private final RecruitRepository repository;
    @Override
    public List<RecruitDto.DetailListResponseDto> recruitDetailList(String date) {
        LocalDate base = LocalDate.parse(date);
        LocalDateTime start = base.withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = base.withDayOfMonth(base.lengthOfMonth()).atTime(LocalTime.MAX);
        return repository.findAllByStartBetween(start, end).stream()
                .map(recruit -> recruit.toDetailListDto(recruit))
                .collect(Collectors.toList());
    }
}
