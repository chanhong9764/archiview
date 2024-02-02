import React, { useState } from "react";
import { Container } from "@mui/material";
import ProfileSection from "../components/MYP_P_01/profileSection";

// dummyProfileData 직접 정의
// const dummyProfileData = {
//   code: 200,
//   message: "회원정보 조회에 성공했습니다.",
//   data: {
//     id: "charles",
//     name: "오철수",
//     email: "####@naver.com",
//     introduce: "안녕하세요",
//   },
// };


const ProfilePage = () => {
  // const { id, name, email } = dummyProfileData.data;
  // const [introduce, setIntroduce] = useState(dummyProfileData.data.introduce);
  // dummyProfileData.data.introduce = introduce;

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
