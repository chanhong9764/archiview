import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  Slide,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SendIcon from "@mui/icons-material/Send";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FindIDModal = ({ onSwitch }) => {
  const [showSignupFields, setShowSignupFields] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // '인증하기' 버튼 클릭 시 핸들러 함수
  const handleVerifyClick = () => {
    setIsButtonDisabled(true); // 버튼을 비활성화 시킴
    setShowSignupFields(true); // 인증번호 필드를 보여줌
  };

  // '아이디 찾기' 버튼 클릭시 핸들러 함수
  const handleAssignClick = () => {
    setOpenSnackbar(true);
  };

  // 모달창 닫을 시 로그인 페이지로 돌아가기
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // 클릭 이외의 이유로 닫히는 것을 방지
    }

    setOpenSnackbar(false);
    onSwitch("Login");
  };

  return (
    <div className="LOG-M-01-Content">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="Logo">
            <img src="http://placehold.it/240X240" alt="" />
          </div>
        </Grid>

        <Grid item xs={12}>
          <TextField
            className="ID-input"
            style={{ width: "100%" }}
            required
            id="name"
            label="이름"
            placeholder="홍길동"
            variant="filled"
          />
        </Grid>

        {/* 이메일 인증 */}
        <Grid item xs={8}>
          <TextField
            className="PW-input"
            style={{ width: "100%" }}
            required
            id="filled-required"
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
                id="email-verification"
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
                style={{ height: "56px", width: "100%" }}
                onClick={handleAssignClick}
              >
                아이디 찾기
              </Button>
              <Dialog
                open={openSnackbar}
                onClose={handleSnackbarClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    ID : SSAFY
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default FindIDModal;
