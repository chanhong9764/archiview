import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, List, ListItem } from '@mui/material';

// password, confirmPassword, passwordError 관리 전체적인거
const InfoSection = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // 새 비밀번호 입력 필드의 값이 변경 시 호출되는 함수
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);    // 패스워드 업데이트
    setPasswordError(event.target.value !== confirmPassword);  //현재 입력 새 비밀번호 !== 비밀번호 확인 -> 오류를 'true'로 설정
  };

  // 비밀번호 재입력 필드의 값이 변경 시 호출되는 함수
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordError(password !== event.target.value);  // 마찬가지로 오류를 'true'로
  };

  return (
    <Card variant="outlined" 
      sx={{  
        mb: 2,
        width: '47%',
        maxWidth: '340px',
        display: 'flex',
        mx:'auto',
        flexDirection: 'column',
        alignItems: 'center'
        }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>비밀번호 변경</Typography>
        <List sx={{ mb: 2 }}>
          <ListItem>비밀번호는 8자 이상 입력해야 합니다.</ListItem>
        </List>
        <TextField
          label="새 비밀번호"
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
          error={passwordError && password.length < 8}
          helperText={(passwordError && password.length < 8) ? '비밀번호는 8자 이상이어야 합니다.' : ''}
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
          error={passwordError && confirmPassword.length > 0 && password !== confirmPassword}
          helperText={(passwordError && confirmPassword.length > 0 && password !== confirmPassword) ? '비밀번호가 일치하지 않습니다.' : ''}
        />
      </CardContent>
    </Card>
  );
};

export default InfoSection;
