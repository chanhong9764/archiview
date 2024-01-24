package com.ssafy.archiview.dto.common;

import com.ssafy.archiview.entity.CsSub;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class CommonDto {
    @Getter
    public static class companyResponseDto {
        private final int id;
        private final String name;
        @Builder
        public companyResponseDto(int id, String name, String url) {
            this.id = id;
            this.name = name;
        }
    }

    @Getter
    public static class tagResponseDto {
        private final List<csMainDto> csList;
        private final List<jobMainDto> jsList;
        @Builder
        public tagResponseDto(List<csMainDto> csList, List<jobMainDto> jsList) {
            this.csList = csList;
            this.jsList = jsList;
        }
    }
    @Getter
    public static class csMainDto {
        private final String name;
        private final List<String> csSubList;
        @Builder
        public csMainDto(String name, List<String> csSubList) {
            this.name = name;
            this.csSubList = csSubList;
        }
    }

    @Getter
    public static class jobMainDto {
        private final String name;
        private final List<String> jobSubList;
        @Builder
        public jobMainDto(String name, List<String> jobSubList) {
            this.name = name;
            this.jobSubList = jobSubList;
        }
    }

}
