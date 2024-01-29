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
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { signupAxios, sendEmailAxios } from "../../api/userAPI";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignUser = ({ onSwitch }) => {
  const [showSignupFields, setShowSignupFields] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isChangeBtnDisabled, setIsChangeBtnDisabled] = useState(true);

  // 각 입력 필드에 대한 정규표현식을 나타내는 상태 추가
  const [isNameValid, setIsNameValid] = useState(true);
  const [isIdValid, setIsIdValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true); // 이메일이 비어있는지 여부를 저장하는 상태 추가

  // API 관리 변수들 추가
  const navigate = useNavigate();
  const initialState = {
    id: "", // varchar(16) 유저의 아이디
    pw: "", // 최소 9자, 최대 16자, 영문+숫자+특수문자 조합
    email: "", // 유저 이메일
    name: "", // 유저 이름
  };

  const [form, handleFormChange, handleFileChange, resetForm] =
    useForm(initialState);
  // const { email, pw, name, id } = form;

  // 이름 입력 필드의 값이 변경 시 호출되는 함수
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setIsNameValid(/^[가-힣]{2,32}$/.test(newName));
    handleFormChange(event);
    // 나머지 코드 유지
  };

  // '인증하기' 버튼 클릭 시 핸들러 함수
  const handleVerifyClick = () => {
    setIsInputDisabled(true);
    setShowSignupFields(true); // 회원가입 및 인증번호 필드를 보여줌
  };

  // ID 입력 필드의 값이 변경 시 호출되는 함수
  const handleIdChange = (event) => {
    const newId = event.target.value;
    setIsIdValid(/^[a-z0-9]{4,16}$/.test(newId));
    handleFormChange(event);
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
    handleFormChange(event);
    setIsEmailEmpty(newEmail.trim() === ""); // 이메일이 비어있는지 여부를 검사하여 상태 업데이트
    // 나머지 코드 유지
  };

  const handleSignupAxios = async () => {
    try {
      await signupAxios(
        form,
        (response) => {
          console.log("데이터 전송 성공:", response);
        },
        (error) => {
          console.error("데이터 전송 실패:", error);
        }
      );
    } catch (error) {
      console.error("데이터 전송 오류:", error);
    }
  };

  // '회원가입' 버튼 클릭시 핸들러 함수
  const handleAssignClick = () => {
    setOpenSnackbar(true);
    handleSignupAxios();
    resetForm();

    setTimeout(() => {
      setOpenSnackbar(false);
      onSwitch("Login");
    }, 1000);
  };

  // 엔터 입력시
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (isEmailValid && !isEmailEmpty) {
        handleVerifyClick();
      }
    }
  };

  // 간단한 비밀번호 검증시 사용되는 변수
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // 패스워드 입력 필드의 값이 변경 시 호출되는 함수
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    handleFormChange(event);
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

  // 인증번호 관련 이벤트 처리
  const handleAuthClick = () => {
    setIsChangeBtnDisabled(false);
  };

  const handleAuthKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAuthClick();
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

        {/* 이름 입력 필드 */}
        <Grid className="Input-Grid" item xs={12}>
          <TextField
            className="ID-input"
            style={{ width: "100%" }}
            name="name"
            required
            label="이름"
            placeholder="홍길동"
            variant="filled"
            onChange={handleNameChange}
            disabled={isInputDisabled}
            error={!isNameValid}
            helperText={!isNameValid ? "한글 2자 이상" : ""}
          />
        </Grid>

        {/* ID 입력 필드 */}
        <Grid className="Input-Grid" item xs={12}>
          <TextField
            className="ID-input"
            style={{ width: "100%" }}
            name="id"
            required
            label="ID"
            placeholder="사용자 ID"
            variant="filled"
            onChange={handleIdChange}
            disabled={isInputDisabled}
            error={!isIdValid}
            helperText={!isIdValid ? "영소문자, 숫자 4~16자리 이내" : ""}
          />
        </Grid>

        {/* PW */}
        <Grid className="Input-Grid" item xs={12}>
          <TextField
            className="PW-input"
            label="PW"
            name="pw"
            required
            placeholder="비밀번호"
            type="password"
            variant="filled"
            onChange={handlePasswordChange}
            error={!isPasswordValid}
            disabled={isInputDisabled}
            helperText={
              !isPasswordValid
                ? "대소문자, 특수문자, 숫자를 포함한 9~16자리"
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
            disabled={isInputDisabled}
            onChange={handleConfirmPasswordChange}
          />
        </Grid>

        {/* 이메일 인증 */}
        <Grid className="Input-Grid" item xs={8}>
          <TextField
            className="PW-input"
            required
            name="email"
            label="이메일"
            placeholder="example@mail.com"
            defaultValue=""
            variant="filled"
            onChange={handleEmailChange}
            onKeyDown={handleKeyPress}
            error={!isEmailValid}
            helperText={!isEmailValid ? "이메일 양식 확인" : ""}
            disabled={isInputDisabled}
          />
        </Grid>
        {/* 이메일 인증하기 버튼 */}
        <Grid className="Input-Grid" item xs={4}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            style={{ height: "56px", width: "100%" }}
            onClick={handleVerifyClick}
            disabled={!isEmailValid || isEmailEmpty || isInputDisabled} // 이메일 정규표현식 만족 여부에 따라 버튼 활성화/비활성화
          >
            인증하기
          </Button>
        </Grid>

        {/* 이메일 인증번호 & 회원가입 완료 버튼 */}
        {showSignupFields && (
          <>
            <Grid className="Input-Grid" item xs={8}>
              <TextField
                className="PW-input"
                required
                label="인증번호"
                placeholder="인증번호 입력"
                variant="filled"
                onKeyDown={handleAuthKeyPress}
                disabled={!isChangeBtnDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                endIcon={<TaskAltIcon />}
                style={{ height: "56px", width: "100%" }}
                onClick={handleAuthClick} // 버튼 클릭 핸들러
                disabled={!isChangeBtnDisabled}
              >
                인증하기
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                className="Login-btn"
                variant="contained"
                endIcon={<AssignmentTurnedInIcon />}
                color="success"
                style={{ height: "56px", width: "100%" }}
                onClick={handleAssignClick}
                disabled={isChangeBtnDisabled} // 비밀번호 조건에 맞지 않으면 버튼 비활성화
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
