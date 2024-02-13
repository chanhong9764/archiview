import React, { useState, useEffect } from "react";
import Tabcompo from "../components/SCH_P_01/tabCompo";
import Accordion from "../components/MYI_P_01/accordion.jsx";
import {
  createTheme,
  ThemeProvider,
  Container,
  Typography,
  Card,
  Grid,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectReply } from "../api/replyAPI.js";

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

function SCH_P_01() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role = useSelector((state) => state.role);
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [replyDetails, setReplyDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReply, setSelectedReply] = useState(null);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // selectedReply가 변경될 때마다 API 호출
    if (selectedReply) {
      selectReply(
        {
          Authorization: accessToken,
        },
        selectedReply.id,
        (resp) => {
          console.log(resp.data.data.reply);
          setReplyDetails(resp.data.data.reply);
          setModalOpen(true);
        },
        (err) => {
          console.log("호출 실패: ", err);
        }
      );
    }
  }, [selectedReply]); // selectedReply가 변경될 때만 이 effect를 실행

  const handleViewDetails = (reply) => {
    console.log(reply);
    if (!isLoggedIn) {
      dispatch({ type: "OPEN_ALERT" });
    } else {
      setSelectedReply(reply);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); // 모달을 닫기
  };

  // 모달 컴포넌트
  const DetailModal = () => (
    <Dialog open={modalOpen} onClose={handleCloseModal}>
      <DialogContent>
        {replyDetails ? (
          <DialogContentText>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {replyDetails.question.content}
            </div>
            {/* 비디오 컨트롤러 */}
            <div>
              <video
                controls
                src={
                  "https://i10b105.p.####.io/api/files/recording/" +
                  replyDetails.videoUrl
                }
                width="500"
              ></video>
            </div>
            {/* 스크립트 섹션에 인라인 스타일을 적용합니다. */}
            <div
              style={{
                border: "1px solid #007BFF", // 테두리 색상을 지정합니다.
                borderRadius: "3px", // 둥근 모서리를 적용합니다.
                padding: "10px", // 내부 여백을 추가합니다.
                marginTop: "10px", // 상단 여백을 추가합니다.
              }}
            >
              {replyDetails.script}
            </div>
          </DialogContentText>
        ) : (
          <DialogContentText>Loading...</DialogContentText> // 데이터 로딩 중 표시
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Tabcompo setQuestions={setQuestions} />
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
                    onClick={() => handleViewDetails(reply)}
                    sx={cardStyles}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        height: 140,
                        objectFit: "cover",
                        borderRadius: "15px 15px 0 0",
                        filter:
                          role === "ROLE_MEMBER" ||
                          role === "ROLE_ADMIN" ||
                          reply.userId === userId
                            ? "blur(0px)"
                            : "blur(10px)",
                      }}
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
                        {reply.companyName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Accordion>
        ))}
        <DetailModal />
      </Container>
    </ThemeProvider>
  );
}

export default SCH_P_01;
