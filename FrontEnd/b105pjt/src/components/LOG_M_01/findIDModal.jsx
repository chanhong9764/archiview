// import {
//   Button,
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   Grid,
//   Slide,
//   TextField,
// } from "@mui/material";
// import React, { useState } from "react";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import SendIcon from "@mui/icons-material/Send";
// import Logo from "../../assets/img/mainLogo-removebg-preview.png";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const FindIDModal = ({ onSwitch }) => {
//   const [showSignupFields, setShowSignupFields] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [isChangeBtnDisabled, setIsChangeBtnDisabled] = useState(true);
//   const [isInputDisabled, setIsInputDisabled] = useState(false);

//   const [isNameValid, setIsNameValid] = useState(true);
//   const [isEmailValid, setIsEmailValid] = useState(true);
//   const [isEmailEmpty, setIsEmailEmpty] = useState(true); // 이메일이 비어있는지 여부를 저장하는 상태 추가

//   // 이메일 입력 필드의 값이 변경 시 호출되는 함수
//   const handleEmailChange = (event) => {
//     const newEmail = event.target.value;
//     setIsEmailValid(
//       /[0-9a-zA-Z][-_￦.]*[0-9a-zA-Z]*\@[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/.test(
//         newEmail
//       )
//     );
//     setIsEmailEmpty(newEmail.trim() === ""); // 이메일이 비어있는지 여부를 검사하여 상태 업데이트
//     // 나머지 코드 유지
//   };

//   // '인증하기' 버튼 클릭 시 핸들러 함수
//   const handleVerifyClick = () => {
//     setIsInputDisabled(true);
//     setShowSignupFields(true); // 인증번호 필드를 보여줌
//   };

//   // '아이디 찾기' 버튼 클릭시 핸들러 함수
//   const handleAssignClick = () => {
//     setOpenSnackbar(true);
//   };

//   // 모달창 닫을 시 로그인 페이지로 돌아가기
//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return; // 클릭 이외의 이유로 닫히는 것을 방지
//     }

//     setOpenSnackbar(false);
//     onSwitch("Login");
//   };

//   // 엔터 입력시
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       if (isEmailValid && !isEmailEmpty) {
//         handleVerifyClick();
//       }
//     }
//   };

//   const handleAuthClick = () => {
//     setIsChangeBtnDisabled(false);
//   };

//   const handleAuthKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleAuthClick();
//     }
//   };

//   // 이름 입력 필드의 값이 변경 시 호출되는 함수
//   const handleNameChange = (event) => {
//     const newName = event.target.value;
//     setIsNameValid(/^[가-힣]{2,32}$/.test(newName));

//     // 나머지 코드 유지
//   };

//   return (
//     <div className="LOG-M-01-Content">
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <div className="Logo">
//             <img src={Logo} style={{ width: "65%" }} alt="" />
//           </div>
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             className="ID-input"
//             style={{ width: "100%" }}
//             required
//             label="이름"
//             placeholder="홍길동"
//             variant="filled"
//             onChange={handleNameChange}
//             onKeyDown={handleKeyPress}
//             disabled={isInputDisabled}
//             error={!isNameValid}
//             helperText={!isNameValid ? "한글 2자 이상" : ""}
//           />
//         </Grid>

//         {/* 이메일 인증 */}
//         <Grid item xs={8}>
//           <TextField
//             className="PW-input"
//             required
//             label="이메일"
//             placeholder="example@mail.com"
//             defaultValue=""
//             variant="filled"
//             onChange={handleEmailChange}
//             onKeyDown={handleKeyPress}
//             error={!isEmailValid}
//             helperText={!isEmailValid ? "이메일 양식 확인" : ""}
//             disabled={isInputDisabled}
//           />
//         </Grid>
//         <Grid item xs={4}>
//           <Button
//             variant="contained"
//             endIcon={<SendIcon />}
//             style={{ height: "56px", width: "100%" }}
//             onClick={handleVerifyClick}
//             disabled={!isEmailValid || isEmailEmpty || isInputDisabled}
//           >
//             인증하기
//           </Button>
//         </Grid>

//         {/* 이메일 인증번호 & 회원가입 완료 버튼 */}
//         {showSignupFields && (
//           <>
//             <Grid item xs={8}>
//               <TextField
//                 className="PW-input"
//                 required
//                 label="인증번호"
//                 placeholder="인증번호 입력"
//                 disabled={!isChangeBtnDisabled}
//                 variant="filled"
//                 onKeyDown={handleAuthKeyPress}
//               />
//             </Grid>
//             <Grid item xs={4}>
//               <Button
//                 variant="contained"
//                 endIcon={<TaskAltIcon />}
//                 style={{ height: "56px", width: "100%" }}
//                 onClick={handleAuthClick} // 버튼 클릭 핸들러
//                 disabled={!isChangeBtnDisabled}
//               >
//                 인증하기
//               </Button>
//             </Grid>

//             <Grid item xs={12}>
//               <Button
//                 className="Login-btn"
//                 variant="contained"
//                 endIcon={<AssignmentTurnedInIcon />}
//                 color="success"
//                 style={{ height: "56px", width: "100%" }}
//                 onClick={handleAssignClick}
//                 disabled={isChangeBtnDisabled}
//               >
//                 아이디 찾기
//               </Button>
//               <Dialog
//                 open={openSnackbar}
//                 onClose={handleSnackbarClose}
//                 TransitionComponent={Transition}
//                 keepMounted
//                 aria-describedby="alert-dialog-slide-description"
//               >
//                 <DialogContent>
//                   <DialogContentText id="alert-dialog-slide-description">
//                     ID : SSAFY
//                   </DialogContentText>
//                 </DialogContent>
//               </Dialog>
//             </Grid>
//           </>
//         )}
//       </Grid>
//     </div>
//   );
// };

// export default FindIDModal;


import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SendIcon from "@mui/icons-material/Send";
import Logo from "../../assets/img/mainLogo-removebg-preview.png";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import FindIDResult from './findIDResult'; // FindIDResult 컴포넌트 import

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FindIDModal = ({ onSwitch }) => {
  const [showSignupFields, setShowSignupFields] = useState(false);
  const [isChangeBtnDisabled, setIsChangeBtnDisabled] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [foundId, setFoundId] = useState(null);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setIsEmailValid(
      /[0-9a-zA-Z][-_￦.]*[0-9a-zA-Z]*\@[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/.test(
        newEmail
      )
    );
    setIsEmailEmpty(newEmail.trim() === "");
  };

  const handleClose = () => {
    setFoundId(null); // 찾은 아이디 상태를 초기화
    onSwitch("Login"); // 로그인 페이지로 전환
  };

  const handleVerifyClick = () => {
    setIsInputDisabled(true);
    setShowSignupFields(true);
  };

  const handleAssignClick = () => {
    setFoundId("SSAFY"); // 아이디 찾기 결과 설정
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && isEmailValid && !isEmailEmpty) {
      handleVerifyClick();
    }
  };

  const handleAuthClick = () => {
    setIsChangeBtnDisabled(false);
  };

  const handleAuthKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAuthClick();
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setIsNameValid(/^[가-힣]{2,32}$/.test(newName));
  };

  return (
    <div className="LOG-M-01-Content">
      <Grid container spacing={2}>
        {/* 로고 */}
        <Grid item xs={12}>
          <div className="Logo">
            <img src={Logo} style={{ width: "65%" }} alt="Logo" />
          </div>
        </Grid>

        {/* 이름 입력 필드 */}
        <Grid item xs={12}>
          <TextField
            className="ID-input"
            style={{ width: "100%" }}
            required
            label="이름"
            placeholder="홍길동"
            variant="filled"
            onChange={handleNameChange}
            onKeyDown={handleKeyPress}
            disabled={isInputDisabled}
            error={!isNameValid}
            helperText={!isNameValid ? "한글 2자 이상" : ""}
          />
        </Grid>

        {/* 이메일 입력 필드 */}
        <Grid item xs={8}>
          <TextField
            className="PW-input"
            required
            label="이메일"
            placeholder="example@mail.com"
            variant="filled"
            onChange={handleEmailChange}
            onKeyDown={handleKeyPress}
            error={!isEmailValid}
            helperText={!isEmailValid ? "이메일 양식 확인" : ""}
            disabled={isInputDisabled}
          />
        </Grid>

        {/* 인증 버튼 */}
        <Grid item xs={4}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            style={{ height: "56px", width: "100%" }}
            onClick={handleVerifyClick}
            disabled={!isEmailValid || isEmailEmpty || isInputDisabled}
          >
            인증하기
          </Button>
        </Grid>

        {/* 인증번호 입력 필드와 아이디 찾기 버튼 */}
        {showSignupFields && (
          <>
           
           <Grid item xs={8}>
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
                onClick={handleAuthClick}
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
                disabled={isChangeBtnDisabled}
              >
                아이디 찾기
              </Button>
            </Grid>
          </>
        )}
      </Grid>

      {/* 아이디 찾기 결과 모달 */}
      <FindIDResult id={foundId} onClose={handleClose} />
    </div>
  );
};

export default FindIDModal;
