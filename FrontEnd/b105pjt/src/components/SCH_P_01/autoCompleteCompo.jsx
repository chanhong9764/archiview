import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ setCompanyName, setCompanyId }) {
  function handlebox(company) {
    setCompanyName(company.name);
    setCompanyId(company.id);
  }
  return (
    <Autocomplete
      id="company"
      freeSolo
      options={company.data}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
          {option.name}
        </li>
      )}
      onChange={(event, newValue) => {
        handlebox(newValue);
      }}
      style={{ width: 462, paddingBottom: "9px", padding: "10px" }}
      renderInput={(params) => (
        <TextField {...params} label="회사명" placeholder="Favorites" />
      )}
    />
  );
}

const company = {
  data: [
    {
      id: 1,
      name: "삼성전자",
    },
    {
      id: 2,
      name: "멀티캠퍼스",
    },
  ],
};
