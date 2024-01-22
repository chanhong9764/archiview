import React, { useState, useEffect } from "react";
import ProfileSection from "../components/MYI_P_01/profileSection.jsx";
import Accordion from "../components/MYI_P_01/accordion.jsx";
import SearchSection from "../components/utils/searchSection.jsx";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  AccordionSummary,
  AccordionDetails,
  Divider,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyNavbar from "../components/MYI_P_02/myNavbar.jsx";

// dummyQuestions 직접 정의
const dummyQuestions = [
  {
    id: 10,
    content: "1분 자기소개",
    replies: [
      {
        id: 32,
        user_id: "kim",
        script: "안녕하십니까...",
        created_at: "2024-01-01 12:23:34",
      },
      {
        id: 33,
        user_id: "park",
        script: "행복한 세상을 만들고픈 ...",
        created_at: "2024-01-02 11:12:43",
      },
    ],
  },
  {
    id: 20,
    content: "프론트엔드란 무엇인가",
    replies: [
      {
        id: 34,
        user_id: "kim",
        script: "안녕하십니까...",
        created_at: "2024-01-01 12:23:34",
      },
      {
        id: 35,
        user_id: "park",
        script: "행복한 세상을 만들고픈 ...",
        created_at: "2024-01-02 11:12:43",
      },
    ],
  },
];

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    setQuestions(dummyQuestions);
  }, []);

  const handleEdit = (questionId) => {
    console.log("Editing question:", questionId);
  };

  const accordionStyles = {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    "&:before": {
      display: "none",
    },
  };

  return (
    <div>
      <MyNavbar></MyNavbar>
      <Container sx={{ mt: 4, mb: 4 }}>
        <ProfileSection imageUrl="https://via.placeholder.com/180X180">
          <Typography variant="h5" gutterBottom>
            이름
          </Typography>
          <Typography variant="body1">이곳에 추가적인 프로필 정보를 표시합니다.</Typography>
        </ProfileSection>
        <SearchSection />
        {questions.map((question, index) => (
          <Paper key={index} sx={{ my: 2, p: 2, boxShadow: theme.shadows[3] }}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
              {question.content}
            </Typography>
            <Accordion sx={accordionStyles}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
              >
                <Typography variant="subtitle1" color="textSecondary">
                  답변 보기
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ flexDirection: "column", padding: theme.spacing(2) }}>
                {question.replies.map((reply, replyIndex) => (
                  <Box key={reply.id} sx={{ my: 2 }}>
                    {replyIndex > 0 && <Divider />}
                    <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                      {reply.user_id}
                    </Typography>
                    <Typography variant="body2" sx={{ my: 1 }}>
                      {reply.script}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ mb: 2, color: theme.palette.text.secondary }}
                    >
                      {reply.created_at}
                    </Typography>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleEdit(question.id)}
                >
                  상세보기
                </Button>
              </AccordionDetails>
            </Accordion>
          </Paper>
        ))}
      </Container>
    </div>
  );
};

export default Page;
