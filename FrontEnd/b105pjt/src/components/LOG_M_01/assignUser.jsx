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
import Logo from "../../assets/img/mainLogo-removebg-preview.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignUser = ({ onSwitch }) => {
  const [showSignupFields, setShowSignupFields] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // '인증하기' 버튼 클릭 시 핸들러 함수
  const handleVerifyClick = () => {
    setIsButtonDisabled(true); // 버튼을 비활성화 시킴
    setShowSignupFields(true); // 회원가입 및 인증번호 필드를 보여줌
  };

  // '회원가입' 버튼 클릭시 핸들러 함수
  const handleAssignClick = () => {
    setOpenSnackbar(true);

    setTimeout(() => {
      setOpenSnackbar(false);
      onSwitch("Login");
    }, 1000);
  };

  // 간단한 비밀번호 검증시 사용되는 변수
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // 새 비밀번호 입력 필드의 값이 변경 시 호출되는 함수
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordError(newPassword.length < 8 || newPassword !== confirmPassword);
  };

  // 비밀번호 재입력 필드의 값이 변경 시 호출되는 함수
  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordError(password.length < 8 || password !== newConfirmPassword);
  };

  return (
    <div className="LOG-M-01-Content">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="Logo">
            <img src={Logo} style={{ width: "65%" }} alt="" />
          </div>
        </Grid>

        <Grid className="Input-Grid" item xs={12}>
          <TextField
            className="ID-input"
            style={{ width: "100%" }}
            required
            label="이름"
            placeholder="홍길동"
            variant="filled"
          />
        </Grid>

        {/* ID */}
        <Grid className="Input-Grid" item xs={12}>
          <TextField
            className="ID-input"
            style={{ width: "100%" }}
            required
            label="ID"
            placeholder="사용자 ID"
            variant="filled"
          />
        </Grid>

        {/* PW */}
        <Grid className="Input-Grid" item xs={12}>
          <TextField
            className="PW-input"
            label="PW"
            required
            placeholder="비밀번호"
            type="password"
            variant="filled"
            onChange={handlePasswordChange}
            value={password}
            error={passwordError && password.length < 8}
            helperText={
              passwordError && password.length < 8
                ? "비밀번호는 8자 이상이어야 합니다."
                : ""
            }
          />
        </Grid>

        {/* PW2 */}
        <Grid className="Input-Grid" item xs={12}>
          <TextField
            className="PW-input"
            required
            label="PW 확인"
            placeholder="비밀번호 확인"
            type="password"
            variant="filled"
            error={
              passwordError &&
              confirmPassword.length > 0 &&
              password !== confirmPassword
            }
            helperText={
              passwordError &&
              confirmPassword.length > 0 &&
              password !== confirmPassword
                ? "비밀번호가 일치하지 않습니다."
                : ""
            }
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </Grid>

        {/* 이메일 인증 */}
        <Grid className="Input-Grid" item xs={8}>
          <TextField
            className="PW-input"
            required
            label="이메일"
            placeholder="example@mail.com"
            defaultValue=""
            variant="filled"
          />
        </Grid>
        <Grid className="Input-Grid" item xs={4}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            style={{ height: "56px", width: "100%" }}
            onClick={handleVerifyClick} // 버튼 클릭 핸들러
          >
            인증하기
          </Button>
        </Grid>

        {/* 이메일 인증번호 & 회원가입 완료 버튼 */}
        {showSignupFields && (
          <>
            <Grid className="Input-Grid" item xs={12}>
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
                style={{ height: "56px", width: "100%" }}
                onClick={handleAssignClick}
              >
                회원가입 완료
              </Button>
              <Dialog
                open={openSnackbar}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    회원가입이 정상적으로 되었습니다.
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

export default AssignUser;
