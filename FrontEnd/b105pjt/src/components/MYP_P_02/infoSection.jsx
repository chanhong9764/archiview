import React, { useState } from "react";
import { Card, CardContent, Typography, TextField } from "@mui/material";

// password, confirmPassword, passwordError 관리 전체적인거
const InfoSection = () => {
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
    <Card
      variant="outlined"
      elevation={3}
      sx={{
        mb: 2,
        width: "47%",
        maxWidth: "340px",
        display: "flex",
        mx: "auto",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            mb: 0.5,
            fontWeight: "bold", // 글꼴 두께 변경
            color: "primary.main", // 색상 변경
          }}
        >
          비밀번호 변경
        </Typography>

        <hr />

        <TextField
          label="새 비밀번호"
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
          error={passwordError && password.length < 8}
          helperText={
            passwordError && password.length < 8
              ? "비밀번호는 8자 이상이어야 합니다."
              : ""
          }
          sx={{ mb: 2 }}
        />
        <TextField
          label="비밀번호 재입력"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
          margin="normal"
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
        />
      </CardContent>
    </Card>
  );
};

export default InfoSection;
