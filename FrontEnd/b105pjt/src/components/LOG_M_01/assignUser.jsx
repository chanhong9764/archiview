import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  Slide,
  TextField,
} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SendIcon from "@mui/icons-material/Send";
import Logo from "../../assets/img/mainLogo-removebg-preview.png";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useForm } from "../../utils/useForm";
import { useNavigate } from "react-router-dom";
import { signup, sendEmail } from "../../api/userAPI";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AssignUser = ({ onSwitch }) => {
  const [showSignupFields, setShowSignupFields] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isChangeBtnDisabled, setIsChangeBtnDisabled] = useState(true);
  const [emailToken, setEmailToken] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isIdValid, setIsIdValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [authNumber, setAuthNumber] = useState("");
  const [inputAuthNum, setInputAuthNum] = useState("");
  const navigate = useNavigate();
  const initialState_signup = {
    id: "",
    pw: "",
    email: "",
    name: "",
  };
  const [form, handleFormChange, handleFileChange, resetForm] =
    useForm(initialState_signup);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setIsNameValid(/^[가-힣]{2,32}$/.test(newName));
    handleFormChange(event);
  };

  const handleVerifyClick = () => {
    setIsInputDisabled(true);
    sendEmail(
      { email: form.email },
      (response) => {
        setEmailToken(response.data.data.emailToken);
        setAuthNumber(response.data.data.authNumber);
        setShowSignupFields(true);
      },
      (error) => {
        console.error("데이터 전송 실패 :", error);
        alert(error.response.data.message);
        setIsInputDisabled(false);
      }
    );
  };

  const handleIdChange = (event) => {
    const newId = event.target.value;
    setIsIdValid(/^[a-z0-9]{4,16}$/.test(newId));
    handleFormChange(event);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setIsEmailValid(
      /[0-9a-zA-Z][-_￦.]*[0-9a-zA-Z]*\@[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/.test(
        newEmail
      )
    );
    handleFormChange(event);
    setIsEmailEmpty(newEmail.trim() === "");
  };

  const handleSignupAxios = async () => {
    try {
      await signup(
        form,
        emailToken,
        (response) => {},
        (error) => {
          console.error("데이터 전송 실패", error);
        }
      );
    } catch (error) {
      console.error("데이터 전송 오류:", error);
    }
  };

  const handleAssignClick = () => {
    setOpenSnackbar(true);
    handleSignupAxios();
    resetForm();

    setTimeout(() => {
      setOpenSnackbar(false);
      onSwitch("Login");
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (
        isEmailValid &&
        !isEmailEmpty &&
        !isInputDisabled &&
        password === confirmPassword &&
        isPasswordValid &&
        isIdValid &&
        isNameValid &&
        form.name !== "" &&
        form.id !== "" &&
        form.pw !== ""
      ) {
        handleVerifyClick();
      }
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    handleFormChange(event);
    setIsPasswordValid(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{9,16}$/.test(newPassword)
    );
    setPassword(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordError(password.length < 8 || password !== newConfirmPassword);
  };

  const handleAuthClick = () => {
    if (inputAuthNum === String(authNumber)) {
      setIsChangeBtnDisabled(false);
    } else {
      alert("인증번호가 다릅니다.");
      setIsChangeBtnDisabled(true);
    }
  };

  const handleAuthChange = (event) => {
    const inputAuthNum = event.target.value;
    setInputAuthNum(inputAuthNum);
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
            error={!isNameValid}
            helperText={!isNameValid ? "한글 2자 이상" : ""}
            disabled={isInputDisabled}
          />
        </Grid>

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
            error={!isIdValid}
            helperText={!isIdValid ? "영소문자, 숫자 4~16자리 이내" : ""}
            disabled={isInputDisabled}
          />
        </Grid>

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
            helperText={
              !isPasswordValid
                ? "대소문자, 특수문자, 숫자를 포함한 9~16자리"
                : ""
            }
            disabled={isInputDisabled}
          />
        </Grid>

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
            disabled={isInputDisabled}
          />
        </Grid>

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

        <Grid className="Input-Grid" item xs={4}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            style={{ height: "56px", width: "100%" }}
            onClick={handleVerifyClick}
            disabled={
              !isEmailValid ||
              isEmailEmpty ||
              isInputDisabled ||
              !(password === confirmPassword) ||
              !isPasswordValid ||
              !isIdValid ||
              !isNameValid ||
              form.name === "" ||
              form.id === "" ||
              form.pw === ""
            }
          >
            인증하기
          </Button>
        </Grid>

        {showSignupFields && (
          <>
            <Grid className="Input-Grid" item xs={8}>
              <TextField
                id="authNum"
                className="PW-input"
                required
                label="인증번호"
                placeholder="인증번호 입력"
                variant="filled"
                onChange={handleAuthChange}
                onKeyDown={handleAuthKeyPress}
                disabled={!isChangeBtnDisabled}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                endIcon={<TaskAltIcon />}
                style={{ height: "56px", width: "100%" }}
                onClick={handleAuthClick}
                disabled={!isChangeBtnDisabled}
              >
                인증확인
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
                disabled={
                  isChangeBtnDisabled ||
                  !isIdValid ||
                  !isPasswordValid ||
                  !(password === confirmPassword) ||
                  !isPasswordValid
                }
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
