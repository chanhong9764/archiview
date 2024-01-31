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
import Logo from "../../assets/img/mainLogo-removebg-preview.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChangPWModal = ({ onSwitch }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

  // 비밀번호 입력창 변경시 값 업데이트
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(event.target.value !== confirmPassword);
  };

  // 비밀번호 점검창 변경시 값 업데이트
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordError(password !== event.target.value);
  };

  // 엔터 입력시
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAssignClick();
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
        {/* PW */}
        <Grid className="Input-Grid" item xs={12}>
          <TextField
            className="PW-input"
            label="PW"
            required
            placeholder="변경할 비밀번호"
            type="password"
            variant="filled"
            onChange={handlePasswordChange}
            onKeyDown={handleKeyPress}
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
            onKeyDown={handleKeyPress}
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
        <Grid item xs={12}>
          <Button
            className="Login-btn"
            variant="contained"
            endIcon={<AssignmentTurnedInIcon />}
            color="success"
            style={{ height: "56px", width: "100%" }}
            onClick={handleAssignClick}
          >
            비밀번호 변경
          </Button>
          <Dialog
            open={openSnackbar}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                비밀번호가 변경되었습니다.
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChangPWModal;
