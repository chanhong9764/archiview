import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import ActionButton from '../components/MYP_P_01/actionButton';
import ProfileSection from '../components/MYP_P_01/profileSection';

// dummyProfileData 직접 정의
const dummyProfileData = {
  code: 200,
  message: "회원정보 조회에 성공했습니다.",
  data: {
    id: "ssafy123",
    name: "김싸피",
    email: "ssafy@naver.com",
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
    mb: 4,
    maxWidth: 'md' // 최대 너비를 medium으로 설정
  }}>
    <ProfileSection imageUrl={profile_url} sx={{ mb: 4, width: '100%' }}>
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>{name}</Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>{email}</Typography>
        <Typography sx={{ mb: 3 }}>{introduce}</Typography>
        <Divider sx={{ width: '100%', my: 2 }} />
        <ActionButton onSave={handleSave} onDelete={handleDelete} />
      </Box>
    </ProfileSection>
  </Container>
);
};

export default ProfilePage;