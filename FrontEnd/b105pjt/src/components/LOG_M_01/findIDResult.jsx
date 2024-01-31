import React from 'react';
import { Button, Typography, Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Logo from "../../assets/img/mainLogo-removebg-preview.png";

const FoundIDResult = ({ foundId, onSwitch }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        maxWidth: 400,
        margin: 'auto',
        '& > *': { // 모든 직접적인 자식에 적용됩니다
          marginBottom: 2, // 아래쪽 마진 추가
          width: '100%' // 너비 100%
        }
      }}
    >
      <Box sx={{ width: "65%" }}>
        <img src={Logo} style={{ width: "100%" }} alt="Logo" />
      </Box>
      <br />

      <Typography variant="subtitle1" sx={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}>
        확인된 아이디
      </Typography>
      
      <Box sx={{
        backgroundColor: '#e8f4f8',
        borderRadius: '10px',
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // 추가: 세로 방향 중앙 정렬
        marginBottom: 2, // 여기에 마진 추가
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {foundId}
        </Typography>
      </Box>
      <br />
      
      <Button
        variant="contained"
        endIcon={<LoginIcon />}
        onClick={() => onSwitch("Login")}
        color="success"
        sx={{ maxWidth: '300px' }}
      >
        로그인하러 가기
      </Button>
    </Box>
  );
};

export default FoundIDResult;
