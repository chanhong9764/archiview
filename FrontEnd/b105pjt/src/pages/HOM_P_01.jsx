import React, { useState } from "react";
import Logo from "../assets/img/mainLogo-removebg-preview.png";
import {
  InputAdornment,
  IconButton,
  Autocomplete,
  Checkbox,
  TextField,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";
import "../assets/css/HOM_P_01.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCompanyList } from "../api/commonsAPI";

const HOM_P_01 = () => {
  const [company, setCompany] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");

  const handleSearchBtn = () => {
    navigate("/search", {
      state: {
        companyName: companyName,
      },
      replace: true,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchBtn();
    }
  };

  useEffect(() => {
    const getCompany = async () => {
      await getCompanyList(
        (res) => {
          setCompany(res.data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    getCompany();
  }, []);

  return (
    <div className="hompage">
      <div>
        <img style={{ width: "400px" }} src={Logo} alt="Main Logo" />
      </div>
      <div>
        <Autocomplete
          style={{ width: "500px", borderRadius: "50px" }}
          id="company"
          freeSolo
          options={company}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
              {option.name}
            </li>
          )}
          onKeyDown={handleKeyPress}
          renderInput={(params) => (
            <TextField
              {...params}
              label="회사명으로 면접 질문 검색"
              sx={{
                "& .MuiInputBase-root.MuiOutlinedInput-root .MuiInputBase-input":
                  {
                    // 입력된 값에 대한 스타일 지정
                    padding: 0,
                    paddingBottom: "9px",
                    paddingTop: "9px",
                  },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchBtn}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default HOM_P_01;
