import { TextField } from "@mui/material";
import React from "react";
import SearchTab from "../SCH_P_01/tabCompo";
import BtnGroupInsert from "./btnGroupInsert";
import OpenVideo from "../MYI_P_02/openVideo";
import { useState } from "react";
import { createReply } from "../../api/replyAPI";
import { useNavigate } from "react-router-dom";

const InsertForm = () => {
  const { Navigate } = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  // 실제 데이터로 수정할 때 주석 해제하고 더미데이터 삭제할 것
  // const [content, setContent] = useState();
  // const [script, setScript] = useState();
  // const [companyId, setCompanyId] = useState();
  // const [csList, setCsList] = useState();
  // const [jobList, setJobList] = useState();
  // const [sessionUrl, setSessionUrl] = useState();
  // -------------------------------------------------------

  // Start - Set Dummy Data
  const [content, setContent] = useState("테스트 제목");
  const [script, setScript] = useState("테스트 스크립트");
  const [companyId, setCompanyId] = useState(3);
  const [csList, setCsList] = useState(["자기소개", "기업", "기타"]);
  const [jobList, setJobList] = useState([
    "Backend Developer",
    "Project Manager",
    "DBMA",
  ]);
  const [sessionUrl, setSessionUrl] = useState();
  // End - Set Dummy Data

  function handlerContent(event) {
    setContent(event.target.value);
  }
  function handlerScript(event) {
    setScript(event.target.value);
  }

  function onClickApply() {
    console.log("onClickApply");

    createReply(
      {
        Authorization: accessToken,
      },
      {
        companyId: companyId,
        content: content,

        csList: csList,
        jobList: jobList,

        questionId: null,
        script: script,
        videoUrl: sessionUrl,
        thumbnailUrl: sessionUrl,
      },
      (resp) => {
        console.log("insertForm -> onClickApply | 내 면접 등록 성공");
        Navigate("/myinterview");
      },
      (error) => {
        console.log("insertForm -> onClickApply | 내 면접 등록 실패");
      }
    );
  }
  function onClickCancle() {
    console.log("onClickCancle");
    Navigate("/myinterview");
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
          setCompanyId={setCompanyId}
          setCsList={setCsList}
          setJobList={setJobList}
        ></SearchTab>
      </div>

      <OpenVideo setSessionUrl={setSessionUrl}></OpenVideo>
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
        onClickApply={onClickApply}
        onClickCancle={onClickCancle}
      />
    </div>
  );
};

export default InsertForm;
