import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SearchTab from "../SCH_P_01/tabCompo";
import OpenVideo from "./openVideo";

const InsertForm = () => {
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

      <OpenVideo></OpenVideo>

      <TextField
        className="Insert-script"
        id="filled-multiline-static"
        label="스크립트"
        multiline
        rows={4}
        defaultValue=""
        variant="filled"
        style={{ paddingTop: "5px" }}
      />
    </div>
  );
};

export default InsertForm;
