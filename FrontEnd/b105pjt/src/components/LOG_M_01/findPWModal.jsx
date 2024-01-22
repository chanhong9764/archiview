import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SendIcon from "@mui/icons-material/Send";
import Logo from "../../assets/img/mainLogo-removebg-preview.png";

const FindPWModal = ({ onSwitch }) => {
  const [showSignupFields, setShowSignupFields] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // '인증하기' 버튼 클릭 시 핸들러 함수
  const handleVerifyClick = () => {
    setIsButtonDisabled(true); // 버튼을 비활성화 시킴
    setShowSignupFields(true); // 인증번호 필드를 보여줌
  };

  // '비밀번호 변경' 버튼 클릭시 핸들러 함수
  const handleAssignClick = () => {
    onSwitch("ChangePW");
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
            className="ID-input"
            style={{ width: "100%" }}
            required
            label="아이디"
            placeholder="ID"
            variant="filled"
          />
        </Grid>

        {/* 이메일 인증 */}
        <Grid item xs={8}>
          <TextField
            className="PW-input"
            style={{ width: "100%" }}
            required
            label="이메일"
            placeholder="example@mail.com"
            defaultValue=""
            variant="filled"
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            style={{ height: "56px", width: "100%" }}
            onClick={handleVerifyClick} // 버튼 클릭 핸들러
            disabled={isButtonDisabled}
          >
            인증하기
          </Button>
        </Grid>

        {/* 이메일 인증번호 & 회원가입 완료 버튼 */}
        {showSignupFields && (
          <>
            <Grid item xs={12}>
              <TextField
                className="PW-input"
                required
                label="인증번호"
                placeholder="인증번호 입력"
                variant="filled"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                className="Login-btn"
                variant="contained"
                endIcon={<AssignmentTurnedInIcon />}
                color="success"
                style={{ height: "56px" }}
                onClick={handleAssignClick}
              >
                비밀번호 변경하기
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default FindPWModal;
