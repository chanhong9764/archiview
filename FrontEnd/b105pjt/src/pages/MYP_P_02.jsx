import React from "react";
import { Container, Typography } from "@mui/material";
import ProfileSection from "../components/MYP_P_02/profileSection";
import InfoSection from "../components/MYP_P_02/infoSection";
import SaveButton from "../components/MYP_P_02/saveButton";
import { useLocation, useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate("/mypage", { replace: true });
  };

  return (
    <Container>
      <ProfileSection imageUrl="https://via.placeholder.com/160x160">
        <Typography variant="h5">이름</Typography>
        <Typography>내 프로필 정보</Typography>
      </ProfileSection>
      <InfoSection />
      <SaveButton onSave={handleSave} />
    </Container>
  );
};

export default Page;
