import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ActionButton from '../components/MYP_P_01/actionButton';
import ProfileSection from '../components/MYP_P_01/profileSection';

// dummyProfileData 직접 정의
const dummyProfileData = {
  code: 200,
  message: "회원정보 조회에 성공했습니다.",
  data: {
    id: "####123",
    name: "김싸피",
    email: "####@naver.com",
    introduce: "안녕하세요",
    profile_url: "https://via.placeholder.com/150",
  }
};

const ProfilePage = () => {
  const { name, email, introduce, profile_url } = dummyProfileData.data;

  const handleSave = () => {
    // 저장 로직
  };

  const handleDelete = () => {
    // 회원탈퇴 로직
  };

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: 4,
      mb: 4
    }}>
      <Box sx={{ 
        p: 2, 
        backgroundColor: 'primary.main', 
        borderRadius: 2,
        color: 'white',
        mb: 4,
        width: 'fit-content',
        boxShadow: 1 
      }}>
        <Typography variant="h4">내 정보</Typography>
      </Box>
      <ProfileSection imageUrl={profile_url} sx={{ mb: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>{name}</Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>{email}</Typography>
          <Typography sx={{ mb: 3 }}>{introduce}</Typography>
          <ActionButton onSave={handleSave} onDelete={handleDelete} />
        </Box>
      </ProfileSection>
    </Container>
  );
};

export default ProfilePage;
