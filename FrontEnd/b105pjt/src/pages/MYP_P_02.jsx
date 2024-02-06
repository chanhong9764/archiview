import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ProfileSection from "../components/MYP_P_02/profileSection";
import InfoSection from "../components/MYP_P_02/infoSection";

const Page = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ProfileSection imageUrl="https://via.placeholder.com/160x160">
        <Typography variant="h5">이름</Typography>
        <Typography>내 프로필 정보</Typography>
      </ProfileSection>
      <InfoSection />
    </Container>
  );
};

export default Page;
