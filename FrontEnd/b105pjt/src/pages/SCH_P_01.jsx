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
  Modal,
  Box,
} from "@mui/material";
import LoginModal from "../components/LOG_M_01/loginModal.jsx";
import AlertModal from "../components/utils/alertModal.jsx";

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

function Test() {
  const [questions, setQuestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 가정: 로그인 상태를 로컬 상태에서 관리
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false); // 경고 모달 상태 추가

  // const [questions, setQuestions] = useState([]);

  const handleViewDetails = (videoUrl) => {
    if (!isLoggedIn) {
      setShowAlertModal(true); // 로그인이 되어 있지 않으면 로그인 모달 표시
    } else {
      window.open(videoUrl, "_blank"); // 로그인이 되어 있으면 URL로 이동
    }
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleConfirmAlert = () => {
    setShowAlertModal(false); // 경고 모달 닫기
    setShowLoginModal(true); // 로그인 모달 열기
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Tabcompo setQuestions={setQuestions}/>
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
                        {reply.companyName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Accordion>
        ))}
        {/* 경고 메시지 모달 */}
        <AlertModal
          open={showAlertModal}
          onClose={() => setShowAlertModal(false)}
          onConfirm={handleConfirmAlert}
          title="로그인 필요"
          message="이 기능을 사용하기 위해서는 로그인이 필요합니다."
        />

        {/* 로그인 모달 */}
        <Modal
          open={showLoginModal}
          onClose={handleCloseLoginModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <LoginModal close={handleCloseLoginModal} />
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}

export default Test;
