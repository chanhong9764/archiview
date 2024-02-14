import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState } from "react";
import { getCompanyList } from "../../api/commonsAPI";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ setCompanyName, setCompanyId }) {
  const [company, setCompany] = useState([]);

  function handlebox(value) {
    let companyName = "";
    let compnayId = "";
    if (value !== null) {
      companyName = value.name;
      compnayId = value.id;
    }
    setCompanyName(companyName);
    if (setCompanyId) {
      setCompanyId(compnayId);
    }
  }

  useEffect(() => {
    const getCompany = async () => {
      await getCompanyList((res) => {
        setCompany(res.data.data);
      });
    };
    getCompany();
  }, []);

  return (
    <Autocomplete
      id="company"
      freeSolo
      options={company}
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
