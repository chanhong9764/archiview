import React from "react";
import Logo from "../assets/img/mainLogo-removebg-preview.png";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../assets/css/HOM_P_01.css";

const HOM_P_01 = () => {
  return (
    <div className="hompage">
      <div>
        <img style={{ width: "400px" }} src={Logo} alt="Main Logo" />
      </div>
      <div>
        <TextField
          style={{ width: "500px", borderRadius: "50px" }}
          label="회사명으로 면접 질문 검색"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default HOM_P_01;
