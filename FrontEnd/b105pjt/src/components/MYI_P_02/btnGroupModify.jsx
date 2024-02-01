import React from "react";
import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";

const BtnGroupInsert = () => {
  const navigate = useNavigate();

  // 경로 이동 핸들러
  const handleNavigate = () => {
    navigate("/myinterview");
  };

  return (
    <div className="Insert-btn-group">
      <Button
        variant="outlined"
        startIcon={<ModeEditIcon />}
        color="success"
        onClick={handleNavigate}
      >
        수정
      </Button>
      <Button
        variant="contained"
        endIcon={<DeleteForeverIcon />}
        color="error"
        onClick={handleNavigate}
      >
        삭제
      </Button>
    </div>
  );
};

export default BtnGroupInsert;
