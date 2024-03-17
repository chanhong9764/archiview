import React from "react";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const BtnGroupInsert = ({ onClickApply, onClickCancle }) => {
  const handleClickCancel = (event) => {
    onClickCancle(event);
  };
  const handleClickApply = (event) => {
    onClickApply(event);
  };

  return (
    <div className="Insert-btn-group">
      <Button
        variant="outlined"
        startIcon={<CancelIcon />}
        onClick={handleClickCancel}
        value="취소"
      >
        취소
      </Button>
      <Button
        variant="contained"
        endIcon={<CheckCircleIcon />}
        color="primary"
        onClick={handleClickApply}
        value="등록"
      >
        등록
      </Button>
    </div>
  );
};

export default BtnGroupInsert;
