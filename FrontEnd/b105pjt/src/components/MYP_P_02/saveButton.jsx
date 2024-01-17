import React from 'react';
import { Button, Box } from '@mui/material';


// 'onSave' prop 받아서 -> 실행 시 함수 지정 -> 상위 컴포넌트에 정의 -> 'SaveButton'으로 전달 -> 저장 버튼 클릭할 때 호출
const SaveButton = ({ onSave }) => {
  return (
    <Box sx={{ 
      padding: '20px', 
        margin: '20px auto', 
      width: '40%', 
      textAlign: 'center', 
      mt: 4, 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center' 
      }}>
      <Button variant="contained" color="primary" onClick={onSave}
      sx={{ width:'100%',
       maxWidth: '350px',
       height:'50px',
      }}
      >
        저장
      </Button>
    </Box>
  );
};

export default SaveButton;

