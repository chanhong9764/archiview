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
      <SearchSection />
      <div className="Calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          locale={koLocale}
          eventClick={handleEventClick}
        />
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
