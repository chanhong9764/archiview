import React from "react";
import MyNavbar from "../components/MYI_P_02/myNavbar";
import { Button, TextField } from "@mui/material";
import "../assets/css/MYI_P_02.css";
import SearchSection from "../components/utils/SearchSection";
import CancelIcon from "@mui/icons-material/Cancel"; // 취소 아이콘
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // 등록 (확인) 아이콘

const MYI_P_02 = () => {
  return (
    <div>
      <MyNavbar></MyNavbar>

      {/* insert form */}
      <div className="MYI-P-02-Content">
        <div className="Insert-form">
          <TextField
            className="Insert-title"
            id="filled-basic"
            label="제목"
            variant="filled"
          />
          <SearchSection className="Insert-search"></SearchSection>

          <img width={"100%"} src="http://placehold.it/720X480" alt="영상" />

          <TextField
            className="Insert-script"
            id="filled-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="filled"
          />

          <div>
            <div className="Insert-btn-group">
              <Button variant="outlined" startIcon={<CancelIcon />}>
                취소
              </Button>
              <Button
                variant="contained"
                endIcon={<CheckCircleIcon />}
                color="primary"
              >
                등록
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MYI_P_02;
