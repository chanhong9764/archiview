import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import "../assets/css/CAL_P_01.css";
import { IconButton, InputAdornment, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import CAL_M_01 from "./CAL_M_01";
import transformEventData from "../utils/transformEventData";
import { selectImg } from "../api/naverAPI";
import styled from "styled-components";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { selectAllRecruits, selectCompanyRecruits } from "../api/calendarAPI";
import interactionPlugin from "@fullcalendar/interaction";

const PageContainer = styled.div`
  margin-bottom: 30px;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: 700,
  overflowY: "auto",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: "10px",
};

const FullCalendarContainer = styled.div`
  max-width: 70%;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .fc {
    max-width: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
  }

  .fc .fc-toolbar.fc-header-toolbar {
    padding: 10px 40px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #ddd;
  }

  .fc .fc-button-primary {
    color: #5a5a5a;
    font-size: 16px;
    border: none;
    background-color: transparent;

    :hover {
      background-color: #eaeaea;
    }

    :disabled {
      color: #ccc;
    }
  }

  .fc-theme-standard th {
    background: #f9f9f9;
    font-weight: 600;
    color: #333;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: #e3f2fd;
    color: #111;
  }

  .fc .fc-daygrid-day-top {
    padding: 5px;
  }

  .fc-event {
    font-size: 14px;
  }

  .fc .fc-col-header-cell {
    padding-top: 10px; /* 더 많은 공간을 주거나 줄입니다 */
    padding-bottom: 10px; /* 더 많은 공간을 주거나 줄입니다 */
  }
  
  .fc .fc-daygrid-day {
    height: 100px !important; /* 셀의 높이 조정 */
    border: 1px solid #ddd !important; /* 셀의 테두리 조정 */
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0px 0 15px 0;
`;

const CAL_P_01 = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [recruitEvent, setRecruitEvent] = useState(null);

  const handleDatesSet = (arg) => {
    const currentStart = arg.view.currentStart;
    const year = currentStart.getFullYear();
    const month = currentStart.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    console.log(`Current View: ${year}-${formattedMonth}`);
  };

  const fetchImage = async (title) => {
    await selectImg(
      { query: title },
      (response) => {
        const firstImage = response.data.items[0].link;
        setImageUrl(firstImage);
      },
      (error) => {
        console.error("이미지 검색 실패:", error);
      }
    );
  };

  useEffect(() => {
    selectAllRecruits(
      {},
      (resp) => {
        console.log("selectAllRecruits: ", resp);
        const newEvents = transformEventData(resp);
        setEvents(newEvents);
      },
      (error) => {}
    );
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEventClick = (clickInfo) => {
    console.log("Event clicked:", clickInfo.event.title);
    setSelectedEvent(clickInfo.event);
    fetchImage(clickInfo.event.title);
    handleOpen();
  };

  const renderEventContent = (eventInfo) => {
    let Icon;
    switch (eventInfo.event.backgroundColor) {
      case "#ED544A":
        Icon = NotificationAddOutlinedIcon;
        break;
      case "#929292":
        Icon = NotificationsOffOutlinedIcon;
        break;
      default:
        Icon = null;
    }

    return (
      <div className="icon">
        {Icon && <Icon style={{ marginRight: "4px", fontSize: "medium" }} />}
        <span>{eventInfo.event.title}</span>
      </div>
    );
  };

  const handleSearchBtn = () => {
    console.log(">>검색버튼");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchBtn();
    }
  };

  return (
    <PageContainer>
      <div style={{ marginBottom: "20px" }}>
        <div className="parent-container">
          <FullCalendarContainer>
            <SearchContainer>
              <TextField
                style={{ width: "500px", borderRadius: "50px" }}
                label="회사명으로 면접 질문 검색"
                variant="outlined"
                onKeyDown={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearchBtn}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </SearchContainer>

            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              datesSet={handleDatesSet}
              events={events}
              locale={koLocale}
              eventClick={handleEventClick}
              eventContent={renderEventContent}
            />
          </FullCalendarContainer>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 600 }}>
            <CAL_M_01
              event={selectedEvent}
              imageUrl={imageUrl}
              onClose={handleClose}
            />
          </Box>
        </Modal>
      </div>
    </PageContainer>
  );
};

export default CAL_P_01;
