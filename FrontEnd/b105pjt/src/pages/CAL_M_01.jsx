import React, { useEffect, useState } from "react";
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
import { detailCompanyRecruits } from "../api/calendarAPI";
import { CircularProgress } from "@mui/material";

const CAL_M_01 = (props) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dense, setDense] = useState(false);
  const [dummyData, setDummyData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const title = props.event.title;

  useEffect(() => {
    detailCompanyRecruits(props.event.id, (resp) => {
      setDummyData(resp.data.data);
    });

    selectImg(title, (response) => {
      const firstImage = response.data.data.imageUrl;
      setImageUrl(firstImage);
    });
  }, []);

  // "질문 더보기" 클릭 핸들러
  const handleMoreQuestionsClick = () => {
    dispatch({
      type: "UPDATE_SELECTED_COMPANY",
      selectedCompany: {
        id: dummyData.company.id,
        name: dummyData.company.name,
      },
    });

    navigate("/search"); // useNavigate 훅을 사용해 /search 경로로 이동
  };

  const handleClickListItem = () => {
    if (isLoggedIn) {
      dispatch({
        type: "UPDATE_SELECTED_COMPANY",
        selectedCompany: {
          id: dummyData.company.id,
          name: dummyData.company.name,
        },
      });
      navigate("/addquestion", { replace: true });
    } else {
      dispatch({
        type: "OPEN_ALERT",
        payload: {
          message: "로그인이 필요합니다.",
        },
      });
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid className="content-center" item xs={3}>
          {imageUrl ? (
            <img
              src={imageUrl}
              style={{ width: "140px", height: "100px" }}
              alt="img"
            />
          ) : (
            <div
              style={{
                width: "140px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </Grid>
        <Grid item xs={9}>
          <Grid item xs={12}>
            <div className="border-line">
              <div className="title">{title}</div>
              <span>
                {dummyData.recruit &&
                  `${dummyData.recruit.start} ~ ${dummyData.recruit.end}`}
              </span>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="content-title">
              {dummyData.recruit && `${dummyData.recruit.title}`}
            </div>
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
            {dummyData.questions && dummyData.questions.length > 0 ? (
              dummyData.questions.map((question) => (
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
              ))
            ) : (
              <ListItem
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
                <ListItemText primary="등록된 질문이 없습니다." />
              </ListItem>
            )}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default CAL_M_01;
