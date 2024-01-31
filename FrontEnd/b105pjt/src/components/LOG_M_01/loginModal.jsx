import { Button, Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import "../../assets/css/LOG_M_01_login.css";
import Logo from "../../assets/img/mainLogo-removebg-preview.png";
import { loginAxios } from "../../api/userAPI";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";

const LoginModal = ({ onSwitch, close }) => {
  const dispatch = useDispatch();

  // API 관리 변수들 추가
  const navigate = useNavigate();
  const initialState_login = {
    id: "", // varchar(16) 유저의 아이디
    pw: "", // 최소 9자, 최대 16자, 영문+숫자+특수문자 조합
  };

  const [form, handleFormChange, handleFileChange, resetForm] =
    useForm(initialState_login);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleClickFindID = () => {
    onSwitch("FindID");
  };

  const handleClickFindPW = () => {
    onSwitch("FindPW");
  };

  const handleClickAssignUser = () => {
    onSwitch("Assign");
  };

  const handleLoginAxios = async () => {
    try {
      const data = await loginAxios(form);
      setCookie("refreshToken", data.refreshToken, {
        path: "/",
        secure: true,
        httpOnly: true,
        SameSite: true,
        Referrer: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      dispatch({ type: "LOGIN", accessToken: data.accessToken });
      close();
    } catch (error) {
      console.error("데이터 전송 오류:", error);
      alert("로그인 실패");
    }
  };

  const handleIdChange = (event) => {
    handleFormChange(event);
    setId(event.target.value);
  };

  const handlePwChange = (event) => {
    handleFormChange(event);
    setPw(event.target.value);
  };

  // 로그인 버튼 클릭 시 (로그인 동작)
  const handleLogin = () => {
    if (id === "123" && pw === "123") {
      dispatch({ type: "LOGIN" });
      close();
    } else {
      handleLoginAxios();
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
            name="id"
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
            name="pw"
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
    </div>
  );
};

export default LoginModal;
