import { Button } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const btnGroupInsert = () => {
  return (
    <div className="Insert-btn-group">
      <Button variant="outlined" startIcon={<ModeEditIcon />} color="success">
        수정
      </Button>
      <Button variant="contained" endIcon={<DeleteForeverIcon />} color="error">
        삭제
      </Button>
    </div>
  );
};

export default btnGroupInsert;
