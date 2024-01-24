import React from 'react';
import { Paper, Avatar } from '@mui/material';

// 'children' : 'ProfileSection' 의 자식요소 - 추가적인 정보나 인터랙티브한 요소들을 표시하는 데 사용
const ProfileSection = ({ imageUrl, children }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        padding: '20px', 
        margin: '20px auto', 
        textAlign: 'center', 
        position: 'relative',
        width: '40%', 
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '10px'
      }}
    >
      <Avatar
        src={imageUrl}
        alt="Profile"
        sx={{ width: 150, height: 150, borderRadius: '50%', mb: 2 }}
      />
      {children}
    </Paper>
  );
};

export default ProfileSection;
