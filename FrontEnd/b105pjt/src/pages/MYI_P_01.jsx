import React from "react";
import ProfileSection from "../components/MYI_P_01/profileSection.jsx";
import Accordion from "../components/MYI_P_01/accordion.jsx";
import SearchSection from "../components/utils/searchSection.jsx";
import { Container, Typography, Button, Box } from "@mui/material";

const Page = () => {
  const handleEdit = (index) => {
    console.log("Editing item:", index);
  };

  const accordionData = [
    { title: "질문 제목 1", content: "질문 내용 1" },
    { title: "질문 제목 2", content: "질문 내용 2" },
    { title: "질문 제목 3", content: "질문 내용 3" },
    { title: "질문 제목 4", content: "질문 내용 4" },
    { title: "질문 제목 5", content: "질문 내용 5" },
    { title: "질문 제목 6", content: "질문 내용 6" },
    { title: "질문 제목 7", content: "질문 내용 7" },
  ];

  return (
    <Container
      sx={{
        width: "80%",
        maxWidth: "none",
        mt: 4,
        mb: 4,
      }}
    >
      <ProfileSection imageUrl="https://via.placeholder.com/180X180">
        <Typography variant="h5">이름</Typography>
        <Typography>이곳에 추가적인 프로필 정보를 표시합니다.</Typography>
      </ProfileSection>
      <SearchSection />
      {accordionData.map((item, index) => (
        <Accordion key={index} title={item.title}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{item.content}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(index)}
            >
              수정하기
            </Button>
          </Box>
        </Accordion>
      ))}
    </Container>
  );
};

export default Page;
