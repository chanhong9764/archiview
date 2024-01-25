import React, { useState, useEffect } from "react";
import Tabcompo from "../components/SCH_P_01/tabCompo";
import Accordion from "../components/MYI_P_01/accordion.jsx";
import {
  createTheme,
  ThemeProvider,
  Container,
  Typography,
  Button,
  Card,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

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

const cardStyles = {
  boxShadow: theme.shadows[3],
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  maxHeight: 400,
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

const mediaStyles = {
  height: 140,
  objectFit: "cover",
  borderRadius: "15px 15px 0 0",
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

function Test() {
  useEffect(() => {
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

  const [questions, setQuestions] = useState([]);

  const handleViewDetails = (videoUrl) => {
    window.open(videoUrl, "_blank");
  };

  return (
    <Container>
      <Tabcompo />
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
                <Card sx={cardStyles}>
                  <CardMedia
                    component="img"
                    sx={mediaStyles}
                    image={reply.thumbnailUrl}
                    alt="Thumbnail Image"
                  />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {reply.userId}
                    </Typography>
                    <Typography variant="body2">{reply.script}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {reply.question.companyName}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleViewDetails(reply.videoUrl)}
                    >
                      상세보기
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Accordion>
      ))}
    </Container>
  );
}

export default Test;
