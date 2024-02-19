package com.ssafy.archiview.dto.common;

import com.ssafy.archiview.entity.CsSub;
import lombok.*;

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
    @AllArgsConstructor
    public static class SearchResponseDto {
        private final String imageUrl;
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

    @Getter
    @NoArgsConstructor(access = AccessLevel.PACKAGE)
    @AllArgsConstructor
    public static class SearchResponse {
        private String lastBuildDate;
        private int total;
        private int start;
        private int display;
        private List<Item> items;

        @NoArgsConstructor(access = AccessLevel.PACKAGE)
        @AllArgsConstructor
        @Getter
        public static class Item {
            private String title;
            private String link;
            private String thumbnail;
            private String sizeheight;
            private String sizewidth;
        }
    }

}
