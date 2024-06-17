package com.ssafy.archiview.repository.JobMain;

import com.ssafy.archiview.dto.common.CommonDto;
import com.ssafy.archiview.entity.JobMain;

import java.util.List;

public interface JobMainRepositoryCustom {
    List<CommonDto.jobMainDto> getJobTagList();
}
