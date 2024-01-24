import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";

const SearchSection = () => {
  // 각 분류에 대한 검색 옵션
  const searchOptions = {
    category1: ["기업명", "상품명", "모델명"],
    category2: ["서울특별시", "경기도", "부산광역시"],
    category3: ["컴퓨터", "휴대폰", "가전제품"],
  };

  const theme = useTheme();

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const [category2, setCategory2] = useState([]);

  const [category3, setCategory3] = useState([]);

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

  return (
    <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
      <Grid container spacing={2}>
        {" "}
        {/* Grid container를 사용해 항목 간 간격을 조절합니다. */}
        <Grid item xs={12} sm={4}>
          {" "}
          {/* Grid item을 사용해 반응형으로 크기를 조절합니다. */}
          <Autocomplete
            options={searchOptions.category1}
            freeSolo
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
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label">대분류</InputLabel>
            <Select
              labelId="demo-multiple-chip-label2"
              id="demo-multiple-chip2" // 고유한 값으로 변경
              multiple
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
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-chip-label3">소분류</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip3" // 고유한 값으로 변경
              multiple
              value={category3}
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
      </Grid>
    </Box>
  );
};

export default SearchSection;
