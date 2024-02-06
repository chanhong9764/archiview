import React, { useState, useEffect } from "react";
import ProfileSection from "../components/MYI_P_01/profileSection.jsx";
import Accordion from "../components/MYI_P_01/accordion.jsx";
import SearchTab from "../components/SCH_P_01/tabCompo.jsx";
import {
  createTheme,
  ThemeProvider,
  Container,
  Typography,
  Card,
  Grid,
  CardContent,
  CardMedia,
} from "@mui/material";
import MyNavbar from "../components/MYI_P_02/myNavbar.jsx";
import { useNavigate, useLocation, resolvePath } from "react-router-dom";
import AdminButton from "../components/MYP_P_01/adminButton.jsx";
import { userDetail } from "../api/userAPI.js";
import { searchQuestion } from "../api/mypageAPI.js";

// 커스텀 테마 정의
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h5: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
});
// 카드 및 미디어 스타일 정의
const cardStyles = {
  boxShadow: theme.shadows[3],
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  maxHeight: 400,
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out",
  cursor: "pointer", // 커서 포인터 추가
  "&:hover": {
    transform: "scale(1.05)",
  },
};

const mediaStyles = {
  height: 140,
  objectFit: "cover",
  borderRadius: "15px 15px 0 0",
};

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const [adminBtn, setAdminBtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [profileData, setProfileData] = useState(null);

  const accessToken = localStorage.getItem("accessToken");

  let userId;

  useEffect(() => {
    // 관리자 페이지에서 보낸 데이터
    const eventData = location.state?.event;

    if (!eventData) {
      // 데이터가 없는경우 (일반 사용자)
      userDetail(
        accessToken,
        (resp) => {
          userId = resp.data.data.id;
          searchQuestion(
            {
              headers: {
                Authorization: accessToken,
              },
            },
            {
              userId: userId,
            },
            (resp) => {
              console.log(
                "MYI_P_01 -> searchQuestion | 질문 검색 성공",
                userId,
                resp.data
              );
              if (resp.data.data) setQuestions(resp.data.data);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      setAdminBtn(true);
      // 데이터가 있는경우 (admin)
    }
  }, []);

  const handleViewDetails = () => {
    // window.open(videoUrl, "_blank");
    navigate("/revise");
  };

  return (
    <ThemeProvider theme={theme}>
      <MyNavbar />
      <Container>
        {adminBtn && <AdminButton></AdminButton>}
        {profileData && (
          <ProfileSection
            imageUrl={
              "https://i10b105.p.####.io/api/files/profile/" +
                profileData.id || "default-image-url.jpg"
            }
          >
            <Typography variant="h5" gutterBottom>
              {profileData.name}
            </Typography>
            <Typography variant="body1">
              {profileData.introduce || "마이페이지에서 소개말을 적어주세요."}
            </Typography>
          </ProfileSection>
        )}
        <SearchTab setQuestions={setQuestions} />
        {questions.map((question, index) => (
          <Accordion
            key={index}
            title={
              <Typography variant="h6" color="primary" gutterBottom>
                {question.content}
              </Typography>
            }
          >
            <Grid container spacing={2}>
              {question.replies.map((reply) => (
                <Grid item xs={12} sm={6} md={4} key={reply.id}>
                  <Card
                    onClick={() => handleViewDetails(reply.videoUrl)}
                    sx={cardStyles}
                  >
                    <CardMedia
                      component="img"
                      sx={mediaStyles}
                      image={
                        "https://i10b105.p.####.io/api/files/thumbnail/" +
                        reply.thumbnailUrl
                      }
                      alt="Thumbnail Image"
                    />
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {reply.userId}
                      </Typography>
                      <Typography variant="body2">{reply.script}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {question.companyName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Accordion>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default Page;
