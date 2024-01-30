import { Button, Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import "../../assets/css/LOG_M_01_login.css";
import Logo from "../../assets/img/mainLogo-removebg-preview.png";
import FoundIDResult from "./findIDResult";

const LoginModal = ({ onSwitch, close }) => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [foundId, setFoundId] = useState(null); // 찾은 아이디 상태 추가
  // const [showFoundID, setShowFoundID] = useState(false); // 찾은 아이디 표시 여부
  if (foundId) {
    // 찾은 아이디가 있을 경우 FoundIDDisplay 컴포넌트를 렌더링
    return <FoundIDResult foundId={foundId} onSwitch={onSwitch} />;
  }


  const handleClickFindID = () => {
    onSwitch("FindID");
  };

  const handleClickFindPW = () => {
    onSwitch("FindPW");
  };

  const handleClickAssignUser = () => {
    onSwitch("Assign");
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePwChange = (event) => {
    setPw(event.target.value);
  };

  const handleCloseResult = () => {
    setFoundId(null); // 찾은 아이디 상태 초기화
    close(); // 로그인 모달 닫기
  };

  // 로그인 버튼 클릭 시 (로그인 동작)
  const handleLogin = () => {
    if (id === "123" && pw === "123") {
      dispatch({ type: "LOGIN" });
      close();
    } else {
      alert("로그인 실패");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="LOG-M-01-Content">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="Logo">
            <img src={Logo} style={{ width: "65%" }} alt="" />
          </div>
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="Form-input"
            required
            label="ID"
            defaultValue=""
            variant="filled"
            onKeyDown={handleKeyPress}
            onChange={handleIdChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="Form-input"
            required
            type="password"
            label="PW"
            defaultValue=""
            variant="filled"
            onKeyDown={handleKeyPress}
            onChange={handlePwChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            className="Login-btn"
            variant="contained"
            endIcon={<LoginIcon />}
            onClick={handleLogin}
            color="success"
          >
            로그인
          </Button>
        </Grid>

        <Grid className="Link-group" item xs={12}>
          <div
            className="hoverable-div"
            onClick={handleClickFindID}
            style={{ marginRight: "20px", cursor: "default" }}
          >
            아이디 찾기
          </div>
          <div
            className="hoverable-div"
            onClick={handleClickFindPW}
            style={{
              borderRight: "1px solid #000",
              borderLeft: "1px solid #000",
              padding: "0 20px",
              cursor: "default",
            }}
          >
            비밀번호 찾기
          </div>
          <div
            className="hoverable-div"
            onClick={handleClickAssignUser}
            style={{ marginLeft: "20px", cursor: "default" }}
          >
            회원가입
          </div>
        </Grid>
      </Grid>
      {foundId && <indIDResult id={foundId} onClose={handleCloseResult} />}
    </div>
  );
};

export default LoginModal;
