import React from "react";
import { TextField, Button, Box } from "@mui/material";

const SearchField = ({ onSearch }) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(inputValue.trim());
  };

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
      <Button variant="contained" color="primary" type="submit">
        검색
      </Button>
    </Box>
  );
};

export default SearchField;
