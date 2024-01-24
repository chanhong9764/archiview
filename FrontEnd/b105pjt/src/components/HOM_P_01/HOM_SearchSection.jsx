import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, MenuItem } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";

const SearchSection = ({ flag, setFlag }) => {
  // 더미 데이터
  const searchOptions = {
    category1: ["기업명", "상품명", "모델명"],
    category2: ["서울특별시", "경기도", "부산광역시"],
    category3: ["컴퓨터", "휴대폰", "가전제품"],
  };

  // 내장 함수를 변수처럼 사용하기위해 선언
  const theme = useTheme();

  // 스타일 입히는 작업 해주는 함수
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  //(반응형 함수) 검색창 체크박스를 검색창 내용물 표시가 바뀔때 마다 반응하는 함수
  const [category2, setCategory2] = useState([]);

  const [category3, setCategory3] = useState([]);

  //반응형 함수를 보충해서 원하는 기능을 넣음, split(,) 으로 나눈 리스트 목록을
  //검색창 안에 넣어줄 역활을 담당해줌
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setCategory2(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChange3 = (event) => {
    const {
      target: { value },
    } = event;
    setCategory3(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // 검색창 내부 스타일 담당 변수들
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  //여기서 부터 화면에 출력해줍니다.
  return (
    <Box sx={{ paddingTop: 2, paddingBottom: 2, width: "100%" }}>
      <Grid container spacing={2}>
        {" "}
        {/* Grid container를 사용해 항목 간 간격을 조절합니다. */}
        <Grid item xs={12} sm={3}>
          {" "}
          {/* Grid item을 사용해 반응형으로 크기를 조절합니다. */}
          <Autocomplete
            options={searchOptions.category1}
            freeSolo
            readOnly={flag ? true : false}
            renderInput={(params) => (
              <TextField
                {...params}
                label="검색"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">대분류</InputLabel>
            <Select
              labelId="demo-multiple-chip-label2"
              id="demo-multiple-chip2" // 고유한 값으로 변경
              multiple
              readOnly={flag ? true : false}
              value={category2}
              onChange={handleChange2}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{ fontSize: 12, height: 23 }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {searchOptions.category2.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                  style={getStyles(category, category2, theme)}
                >
                  <Checkbox checked={category2.indexOf(category) > -1} />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={flag ? 6 : 5}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label3">소분류</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip3" // 고유한 값으로 변경
              multiple
              value={category3}
              readOnly={flag ? true : false}
              onChange={handleChange3}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{ fontSize: 12, height: 23 }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {searchOptions.category3.map((category) => (
                <MenuItem
                  key={category}
                  value={category}
                  style={getStyles(category, category3, theme)}
                >
                  <Checkbox checked={category3.indexOf(category) > -1} />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {flag ? null : (
          <Grid
            item
            sm={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="primary"
              // size="large"
              // type="submit"
              onClick={() => (!flag ? setFlag(!flag) : null)}
            >
              검색
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SearchSection;