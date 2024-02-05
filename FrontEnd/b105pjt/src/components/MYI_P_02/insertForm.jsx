import { TextField } from "@mui/material";
import React from "react";
import SearchTab from "../SCH_P_01/tabCompo";
import BtnGroupInsert from "./btnGroupInsert";
import OpenVideo from "../MYI_P_02/openVideo";
import { useState } from "react";

const InsertForm = () => {
  const [clickEvent, setClickEvent] = useState();
  const [content, setContent] = useState();
  const [script, setScript] = useState();
  const [company, setCompany] = useState();
  const [csList, setCsList] = useState();
  const [jobList, setJobList] = useState();
  const [sessionUrl, setSessionUrl] = useState();

  function handlerContent(event) {
    setContent(event.target.value);
  }
  function handlerScript(event) {
    setScript(event.target.value);
  }

  return (
    <div>
      <TextField
        className="Insert-title"
        id="filled-basic"
        label="제목"
        variant="filled"
        onChange={handlerContent}
      />

      <div className="Insert-search">
        <SearchTab
          company={company}
          csList={csList}
          jobList={jobList}
        ></SearchTab>
      </div>

      <OpenVideo
        sessionUrl={sessionUrl}
      ></OpenVideo>
      <br />

      <TextField
        className="Insert-script"
        id="filled-multiline-static"
        label="스크립트"
        multiline
        rows={4}
        defaultValue=""
        variant="filled"
        style={{ paddingTop: "5px" }}
        onChange={handlerScript}
      />
      <BtnGroupInsert
        setClickEvent={setClickEvent}   
      />
    </div>
  );
};

export default InsertForm;
