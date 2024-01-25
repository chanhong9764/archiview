import { TextField } from "@mui/material";
import React from "react";
import SearchTab from "../SCH_P_01/tabCompo";

const insertForm = () => {
  return (
    <div>
      <TextField
        className="Insert-title"
        id="filled-basic"
        label="제목"
        variant="filled"
      />

      <div className="Insert-search">
        <SearchTab></SearchTab>
      </div>

      <img width={"100%"} src="http://placehold.it/720X480" alt="영상" />

      <TextField
        className="Insert-script"
        id="filled-multiline-static"
        label="스크립트"
        multiline
        rows={4}
        defaultValue=""
        variant="filled"
      />
    </div>
  );
};

export default insertForm;
