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

export default function CheckboxesTags({ setCompany, setCompanyId, company }) {
  const [companies, setCompanies] = useState([]);

  function handlebox(value) {
    setCompany(value);
    let companyId = "";
    if (value !== null) {
      companyId = value.id;
    }
    if (setCompanyId) {
      setCompanyId(companyId);
    }
  }

  useEffect(() => {
    const getCompany = async () => {
      await getCompanyList((res) => {
        setCompanies(res.data.data);
        console.log(res.data.data);
      });
    };
    getCompany();
  }, []);

  return (
    <Autocomplete
      id="company"
      freeSolo
      options={companies}
      value={company}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
          {option.name}
        </li>
      )}
      onChange={(e, value) => {
        handlebox(value);
      }}
      sx={{
        width: 462,
        paddingBottom: "9px",
        padding: "10px",
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="회사명"
          placeholder="회사명을 입력해주세요"
        />
      )}
    />
  );
}
