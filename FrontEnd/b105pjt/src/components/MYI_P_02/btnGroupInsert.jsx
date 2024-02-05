import React from "react";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const BtnGroupInsert = (clickEvent) => {
  const navigate = useNavigate();

  const handleClickCancel = (event) => {
    clickEvent = "cancel";
    navigate("/myinterview");
  };

  const handleClickApply = (event) => {
    clickEvent = "apply";
    navigate("/myinterview");
  };

  return (
    <div className="Insert-btn-group">
      <Button
        variant="outlined"
        startIcon={<CancelIcon />}
        onClick={handleClickCancel}
      >
        취소
      </Button>
      <Button
        variant="contained"
        endIcon={<CheckCircleIcon />}
        color="primary"
        onClick={handleClickApply}
      >
        등록
      </Button>
    </div>
  );
};

export default BtnGroupInsert;
