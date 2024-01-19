import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  return (
    <Autocomplete
      id="company"
      freeSolo
      options={company}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
          {option.title}
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
const company = [
  { title: "삼성 전자", year: 1994 },
  { title: "삼성 화제", year: 1972 },
  { title: "LG 전자", year: 1974 },
  { title: "현대오토에버", year: 2008 },
  { title: "현대자동차", year: 1957 },
];
