import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
} from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import CreateIcon from "@mui/icons-material/Create";
import "../assets/css/CAL_M_01.css";
import { selectImg } from "../api/naverAPI";

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
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dense, setDense] = useState(false);

  const title = props.event.title;

  // "질문 더보기" 클릭 핸들러
  const handleMoreQuestionsClick = () => {
    navigate("/search"); // useNavigate 훅을 사용해 /search 경로로 이동
  };

  const handleClickListItem = () => {
    if (isLoggedIn) {
      navigate("/addquestion", { replace: true });
    } else {
      dispatch({ type: "OPEN_ALERT" });
    }
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
    </div>
  );
};

export default CAL_M_01;
