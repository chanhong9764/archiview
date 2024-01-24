import { Button } from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const btnGroupInsert = () => {
  return (
    <div className="Insert-btn-group">
      <Button variant="outlined" startIcon={<CancelIcon />}>
        취소
      </Button>
      <Button variant="contained" endIcon={<CheckCircleIcon />} color="primary">
        등록
      </Button>
    </div>
  );
};

export default btnGroupInsert;
