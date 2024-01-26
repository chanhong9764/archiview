import React from "react";
import Logo from "../assets/img/mainLogo-removebg-preview.png";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../assets/css/HOM_P_01.css";
import { useNavigate } from "react-router-dom";

const HOM_P_01 = () => {
  const navigate = useNavigate();

  const handleSearchBtn = () => {
    navigate("/search", { replace: true });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchBtn();
    }
  };

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
          onKeyDown={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchBtn}>
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
