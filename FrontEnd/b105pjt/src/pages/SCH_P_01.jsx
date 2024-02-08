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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

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

  const handleViewDetails = (reply) => {
    if (!isLoggedIn) {
      dispatch({ type: "OPEN_ALERT" });
    } else {
      navigate("/interview/detail", {
        state: { postId: reply.userId },
      });
    }
  };

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
                        "https://i10b105.p.ssafy.io/api/files/thumbnail/" +
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
      </Container>
    </ThemeProvider>
  );
}

export default SCH_P_01;
