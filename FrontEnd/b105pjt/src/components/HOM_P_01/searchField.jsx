import React from "react";
import { TextField, Button, Box } from "@mui/material";

//props로 flag와 반응형 함수 setFlag를 받아옴
const SearchField = ({ onSearch, flag, setFlag }) => {
  //검색창이랑 반응해줄 함수와 변수
  const [inputValue, setInputValue] = React.useState("");

  //찾아주는 함수 onSearch
  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(inputValue.trim());
  };

  //여기서 부터 화면에 출력해줍니다.
  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2, // 테마 간격
        width: "100%", // 폼의 전체 너비를 사용
      }}
    >
      <TextField
        fullWidth // TextField의 전체 너비를 사용
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        label="질문 검색"
        size="small"
        sx={{
          flexGrow: 1, // TextField가 성장하여 여유 공간을 채우도록 함
        }}
      />
      <Button
        variant="contained"
        color="primary"
        // type="submit"
        onClick={() => (!flag ? setFlag(!flag) : null)}
      >
        검색
      </Button>
    </Box>
  );
};

export default SearchField;
