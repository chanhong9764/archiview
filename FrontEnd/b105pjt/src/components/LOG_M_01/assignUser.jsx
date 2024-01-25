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

  // 각 입력 필드에 대한 정규표현식을 나타내는 상태 추가
  const [isNameValid, setIsNameValid] = useState(true);
  const [isIdValid, setIsIdValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true); // 이메일이 비어있는지 여부를 저장하는 상태 추가

  // 이름 입력 필드의 값이 변경 시 호출되는 함수
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setIsNameValid(/^[가-힣]{2,32}$/.test(newName));

    // 나머지 코드 유지
  };

  // '인증하기' 버튼 클릭 시 핸들러 함수
  const handleVerifyClick = () => {
    setShowSignupFields(true); // 회원가입 및 인증번호 필드를 보여줌
  };

  // ID 입력 필드의 값이 변경 시 호출되는 함수
  const handleIdChange = (event) => {
    const newId = event.target.value;
    setIsIdValid(/^[a-z0-9]{4,16}$/.test(newId));
    // 나머지 코드 유지
  };

  // 이메일 입력 필드의 값이 변경 시 호출되는 함수
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setIsEmailValid(
      /[0-9a-zA-Z][-_￦.]*[0-9a-zA-Z]*\@[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/.test(
        newEmail
      )
    );
    setIsEmailEmpty(newEmail.trim() === ""); // 이메일이 비어있는지 여부를 검사하여 상태 업데이트
    // 나머지 코드 유지
  };

  // '회원가입' 버튼 클릭시 핸들러 함수
  const handleAssignClick = () => {
    if (password.length < 8 || password !== confirmPassword) {
      // 비밀번호 조건에 맞지 않으면 진행하지 않음
      return;
    }

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

  // 패스워드 입력 필드의 값이 변경 시 호출되는 함수
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setIsPasswordValid(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{9,16}$/.test(newPassword)
    );
    setPassword(newPassword);
    // 나머지 코드 유지
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

        {/* 이름 입력 필드 */}
        <Grid className="Input-Grid" item xs={12}>
          <TextField
            className="ID-input"
            style={{ width: "100%" }}
            required
            label="이름"
            placeholder="홍길동"
            variant="filled"
            onChange={handleNameChange}
            error={!isNameValid}
            helperText={
              !isNameValid ? "한글로 2~32자리 이내로 입력하세요." : ""
            }
          />
        </Grid>

        {/* ID 입력 필드 */}
        <Grid className="Input-Grid" item xs={12}>
          <TextField
            className="ID-input"
            style={{ width: "100%" }}
            required
            label="ID"
            placeholder="사용자 ID"
            variant="filled"
            onChange={handleIdChange}
            error={!isIdValid}
            helperText={
              !isIdValid ? "영소문자와 숫자로 4~16자리 이내로 입력하세요." : ""
            }
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
            error={!isPasswordValid}
            helperText={
              !isPasswordValid
                ? "대문자, 소문자, 특수문자 및 숫자를 포함한 9~16자리로 입력하세요."
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
            onChange={handleEmailChange}
            error={!isEmailValid}
            helperText={!isEmailValid ? "유효한 이메일 주소를 입력하세요." : ""}
          />
        </Grid>
        {/* 이메일 인증하기 버튼 */}
        <Grid className="Input-Grid" item xs={4}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            style={{ height: "56px", width: "100%" }}
            onClick={handleVerifyClick}
            disabled={!isEmailValid || isEmailEmpty} // 이메일 정규표현식 만족 여부에 따라 버튼 활성화/비활성화
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
                disabled={password.length < 8 || password !== confirmPassword} // 비밀번호 조건에 맞지 않으면 버튼 비활성화
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
