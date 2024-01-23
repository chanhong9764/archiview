import React, { useEffect, useState } from "react";
import SearchSection from "../components/utils/searchSection";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import "../assets/css/CAL_P_01.css";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import CAL_M_01 from "./CAL_M_01";
import transformEventData from "../utils/transformEventData";
import { selectImg } from "../api/naverAPI";
import styled from "styled-components";

const dummyEvent = {
  code: 200,
  message: "채용 공고 리스트를 조회했습니다.",
  data: [
    {
      recruit_id: 10,
      company_name: "네이버",
      start: "2024-01-16",
      end: "2024-02-18",
    },
    {
      recruit_id: 11,
      company_name: "카카오",
      start: "2024-01-22",
      end: "2024-02-28",
    },
    {
      recruit_id: 10,
      company_name: "네이버",
      start: "2024-01-16",
      end: "2024-02-18",
    },
    {
      recruit_id: 11,
      company_name: "카카오",
      start: "2024-01-22",
      end: "2024-02-28",
    },
  ],
};

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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  // 캘린더 전체 사이즈 조정
  .fc {
    width: 100%;
  }

  // toolbar container
  .fc .fc-toolbar.fc-header-toolbar {
    margin: 0;
    padding: 0 40px;
    background-color: #e2e2e2;
    height: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 29px;
    color: #555555;
    border-radius: 5px;s
  }

  // toolbar 버튼
  .fc .fc-button-primary {
    background-color: transparent;
    border: none;
    color: #888888;

    span {
      font-weight: 500;
      font-size: 28px;
    }

    :hover {
      background-color: transparent;
    }
  }

  // 요일 부분
  .fc-theme-standard th {
    height: 32px;
    padding-top: 3.5px;
    background: #f2f2f2;
    border: 1px solid #dddee0;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #;
  }

  // 오늘 날짜 배경색
  .fc .fc-daygrid-day.fc-day-today {
    background-color: #fff8bd;
    color: #356eff;
  }

  // 날짜별 그리드
  .fc .fc-daygrid-day-frame {
    padding: 10px;
  }

  // 날짜  ex) 2일
  .fc .fc-daygrid-day-top {
    flex-direction: row;
    margin-bottom: 3px;
  }

  // 각 이벤트 요소
  .fc-event {
    cursor: pointer;
    padding: 5px 8px;
    margin-bottom: 5px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
  }
`;

const CAL_P_01 = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트 상태 추가

  const [imageUrl, setImageUrl] = useState(""); // 이미지 URL 상태

  // 이미지 검색 함수
  const fetchImage = async (title) => {
    try {
      // 이미지 검색 API 요청
      await selectImg(
        { query: title }, // 검색어
        (response) => {
          // 성공 콜백: 첫 번째 이미지의 URL을 설정
          const firstImage = response.data.items[0].link;
          setImageUrl(firstImage);
        },
        (error) => {
          // 실패 콜백
          console.error("이미지 검색 실패:", error);
        }
      );
    } catch (error) {
      console.error("이미지 검색 오류:", error);
    }
  };

  useEffect(() => {
    const newEvents = transformEventData(dummyEvent);
    setEvents(newEvents);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 이벤트 클릭시 동작 수정
  const handleEventClick = (clickInfo) => {
    console.log("Event clicked:", clickInfo.event.title);
    setSelectedEvent(clickInfo.event); // 선택된 이벤트 저장
    fetchImage(clickInfo.event.title);
    handleOpen();
  };

  return (
    <div>
      <div className="parent-container">
        <SearchSection />
        <div className="calendar-container">
          <FullCalendarContainer>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              locale={koLocale}
              eventClick={handleEventClick}
            />
          </FullCalendarContainer>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <CAL_M_01 event={selectedEvent}></CAL_M_01>
        </Box>
      </Modal>
    </div>
  );
};

export default CAL_P_01;
