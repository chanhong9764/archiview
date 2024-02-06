import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import CreateIcon from "@mui/icons-material/Create";
import LoginModal from "../components/LOG_M_01/loginModal";
import "../assets/css/CAL_M_01.css";
import { selectImg } from "../api/naverAPI";
import CloseIcon from "@mui/icons-material/Close"; // 닫기 아이콘 추가
import AlertModal from "../components/utils/alertModal"; // AlertModal 컴포넌트 임포트

const dummyData = {
  code: 200,
  message: "채용 공고를 조회했습니다.",
  data: {
    recruit_id: 10,
    company_id: 32,
    title: "네이버 백엔드 개발자 모집 공고",
    content: <div>네이버다잉</div>,
    start: "2024-01-16",
    end: "2024-02-18",
    questions: [
      {
        id: 10,
        company_id: 32,
        content: "1분 자기소개",
      },
      {
        id: 12,
        company_id: 32,
        content: "2분 자기소개",
      },
    ],
  },
};

const CAL_M_01 = (props) => {
  const { onClose } = props;
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const title = props.event.title;

  // "질문 더보기" 클릭 핸들러
  const handleMoreQuestionsClick = () => {
    navigate("/search"); // useNavigate 훅을 사용해 /search 경로로 이동
  };

  const handleClickListItem = () => {
    if (isLoggedIn) {
      navigate("/addquestion", { replace: true });
    } else {
      setShowAlertModal(true);
    }
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleConfirmAlert = () => {
    setShowAlertModal(false);
    setShowLoginModal(true);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid className="content-center" item xs={3}>
          <img src={""} alt="이미지" />
        </Grid>
        <Grid item xs={9}>
          <Grid item xs={12}>
            <div className="border-line">
              <div className="title">{title}</div>
              <span>
                {dummyData.data.start} ~ {dummyData.data.end}
              </span>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="content-title">{dummyData.data.title}</div>
          </Grid>
        </Grid>

        <Grid className="moreList" item xs={12}>
          <Button
            onClick={handleMoreQuestionsClick}
            className="moreList-content"
          >
            질문 더보기
          </Button>
        </Grid>

        <Grid item xs={12}>
          <List dense={dense}>
            {dummyData.data.questions.map((question) => (
              <ListItem
                key={question.id}
                className="listItem"
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="create"
                    onClick={handleClickListItem}
                  >
                    <CreateIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <ContactSupportIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={question.content} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>

      {/* 경고 메시지 모달 */}
      <AlertModal
        open={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        onConfirm={handleConfirmAlert}
      />

      {/* 로그인 모달 */}
      <Modal
        open={showLoginModal}
        onClose={handleCloseLoginModal}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
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
      <IconButton
        aria-label="close"
        onClick={onClose} // 여기서 onClose 함수를 사용하여 모달 닫기
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "gray",
        }}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default CAL_M_01;
