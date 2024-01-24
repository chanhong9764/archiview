import React, { useState, useEffect } from "react";
import ProfileSection from "../components/MYI_P_01/profileSection.jsx";
import Accordion from "../components/MYI_P_01/accordion.jsx";
import SearchSection from "../components/utils/searchSection.jsx";
import {
  Container,
  Typography,
  Button,
  Card,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
  useTheme,
  Modal,
  Box,
} from "@mui/material";
import MyNavbar from "../components/MYI_P_02/myNavbar.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import MYI_P_02_MODIFY from "./MYI_P_02_Modify.jsx";

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
      {
        id: 34,
        user_id: "park",
        script: "행복한 세상을 만들고픈 ...",
        created_at: "2024-01-02 11:12:43",
      },
      {
        id: 35,
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
        id: 36,
        user_id: "kim",
        script: "안녕하십니까...",
        created_at: "2024-01-01 12:23:34",
      },
      {
        id: 37,
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
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [selectedReply, setSelectedReply] = useState(null);

  const handleOpenModal = (reply) => {
    setSelectedReply(reply);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleViewDetails = (replyId) => {
    handleOpenModal(replyId);
    console.log("Viewing details of reply:", replyId);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: 600,
    overflowY: "auto",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: "10px",
  };

  useEffect(() => {
    setQuestions(dummyQuestions);
  }, []);

  const cardStyles = {
    boxShadow: theme.shadows[1],
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // 컨텐츠 간격 균등 조정
    maxHeight: 400, // 카드 최대 높이 설정
    overflow: "hidden", // 내용이 넘칠 경우 숨김
  };

  const mediaStyles = {
    height: 140,
    objectFit: "cover", // 이미지 비율 유지
  };

  return (
    <div>
      <MyNavbar></MyNavbar>
      <Container sx={{ mt: 4, mb: 4 }}>
        <ProfileSection imageUrl="https://via.placeholder.com/180X180">
          <Typography variant="h5" gutterBottom>
            이름
          </Typography>
          <Typography variant="body1">
            이곳에 추가적인 프로필 정보를 표시합니다.
          </Typography>
        </ProfileSection>
        <SearchSection />
        {questions.map((question, index) => (
          <Accordion
            key={index}
            title={
              <Typography
                variant="h6"
                component="h6"
                color="primary"
                gutterBottom
              >
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
                      image="https://via.placeholder.com/300x300"
                      alt="Media Content"
                    />
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {reply.user_id}
                      </Typography>
                      <Typography variant="body2">{reply.script}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {reply.created_at}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleViewDetails(reply.id)}
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
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="custom-modal"
        >
          <Box sx={{ ...modalStyle, width: 600 }}>
            <MYI_P_02_MODIFY></MYI_P_02_MODIFY>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default Page;
