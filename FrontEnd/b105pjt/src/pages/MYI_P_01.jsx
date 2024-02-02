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
  Button,
} from "@mui/material";
import MyNavbar from "../components/MYI_P_02/myNavbar.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import AdminButton from "../components/MYP_P_01/adminButton.jsx";

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

const dummyProfileData = {
  code: 200,
  message: "회원정보 조회에 성공했습니다.",
  data: {
    id: "####123",
    name: "김싸피",
    email: "####@naver.com",
    introduce: "안녕하세요",
    profile_url: "https://via.placeholder.com/150",
  },
};

// 새로운 dummyQuestions 정의
const dummyQuestions = [
  // 데이터 구조 변경으로 예시 데이터 추가
  {
    code: "SELECT_REPLY_SUCCESS",
    message: "답변 조회에 성공했습니다.",
    data: {
      reply: {
        id: 1,
        userId: "chan9784",
        script: "나는 박찬홍이다",
        videoUrl: "https://example.com/video",
        thumbnailUrl: "https://via.placeholder.com/240X240",
        question: {
          content: "1분 자기소개",
          companyName: "삼성전자",
          csList: ["자기소개"],
          jobList: ["프론트엔드", "백엔드"],
        },
        comments: [
          { id: 1, userId: "user1", content: "멋진 소개입니다!" },
          { id: 2, userId: "user2", content: "정말 인상적이네요!" },
        ],
        likeCnt: 1,
      },
      like: false,
    },
  },
  // 추가 답변 데이터...
];

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const [adminBtn, setAdminBtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 관리자 페이지에서 보낸 데이터
    const eventData = location.state?.event;

    if (!eventData) {
      // 데이터가 없는경우 (일반 사용자)
    } else {
      setAdminBtn(true);
      // 데이터가 있는경우 (admin)
    }

    const formattedQuestions = dummyQuestions.map((item) => {
      const replyData = item.data.reply;
      return {
        id: replyData.id,
        content: replyData.question.content,
        replies: [replyData],
      };
    });
    setQuestions(formattedQuestions);
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
        <ProfileSection imageUrl={dummyProfileData.data.profile_url}>
          <Typography variant="h5" gutterBottom>
            {dummyProfileData.data.name}
          </Typography>
          <Typography variant="body1">
            {dummyProfileData.data.introduce}
          </Typography>
        </ProfileSection>
        <SearchTab />
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
                      image={reply.thumbnailUrl}
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
                        {reply.question.companyName}
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
