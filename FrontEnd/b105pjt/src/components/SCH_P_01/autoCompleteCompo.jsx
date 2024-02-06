import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ setCompanyName }) {
  function handlebox(companyName) {
    setCompanyName(companyName);
  }
  return (
    <Autocomplete
      id="company"
      freeSolo
      options={company.data}
      getOptionLabel={(option) => option.companyName}
      renderOption={(props, option, { selected }) => (
        <li {...props} onClick={() => handlebox(option.companyName)}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
          {option.companyName}
        </li>
      )}
      style={{ width: 462, paddingBottom: "9px", padding: "10px" }}
      renderInput={(params) => (
        <TextField {...params} label="회사명" placeholder="Favorites" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const company = {
  code: "SEARCH_QUESTION_SUCCESS",
  message: "질문 검색에 성공했습니다.",
  data: [
    {
      id: 1,
      content: "1분 자기소개",
      companyName: "삼성전자",
      csList: ["역량", "경험"],
      jobList: ["프론트엔드", "백엔드"],
      replies: [
        {
          id: 1,
          userId: "chan9784",
          script: "수정 테스트중4",
          videoUrl: "http://www.naver.com4",
          thumbnailUrl: "http://google.com4",
          comments: [
            {
              id: 1,
              userId: "chanhong9784",
              content: "진짜 ㅈㄴ 멋지긴하네",
            },
            {
              id: 2,
              userId: "chan9784",
              content: "ㅇㅈ 잘하네",
            },
            {
              id: 3,
              userId: "chanhong9784",
              content: "asdasdh",
            },
            {
              id: 5,
              userId: "chanhong9784",
              content: "asdasdh",
            },
            {
              id: 6,
              userId: "chanhong9784",
              content: "asdasd111h",
            },
          ],
          likeCnt: 1,
        },
      ],
    },
    {
      id: 3,
      content: "질문 저장 테스트중2",
      companyName: "삼성전",
      csList: ["자기소개", "경험"],
      jobList: ["백엔드", "프론트엔드"],
      replies: [
        {
          id: 2,
          userId: "chanhong9784",
          script: "안녕하세요",
          videoUrl: "asdasdasda",
          thumbnailUrl: "asdasdas",
          comments: [],
          likeCnt: 0,
        },
        {
          id: 3,
          userId: "chanhong9784",
          script: "안녕하세요",
          videoUrl: "asdasdasda",
          thumbnailUrl: "asdasdas",
          comments: [],
          likeCnt: 0,
        },
      ],
    },
  ],
};
