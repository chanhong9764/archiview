import React, { useState } from "react";
import { Container } from "@mui/material";
import ProfileSection from "../components/MYP_P_01/profileSection";

const ProfilePage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        mb: 4,
        maxWidth: "md", // 최대 너비를 medium으로 설정
      }}
    >
      <ProfileSection sx={{ mb: 4, width: "100%" }} />
    </Container>
  );
};

export default ProfilePage;