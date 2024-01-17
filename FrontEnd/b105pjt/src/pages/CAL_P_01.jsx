import React, { useState } from "react";
import SearchSection from "../components/utils/searchSection";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import "../assets/css/CAL_P_01.css";

const CAL_P_01 = () => {
  const [events, setEvents] = useState([
    { title: "event 1", date: "2024-01-16" },
    { title: "event 2", date: "2024-01-17", date: "2024-01-21" },
  ]);

  return (
    <div>
      <SearchSection></SearchSection>
      <div className="Calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          locale={koLocale}
        />
      </div>
    </div>
  );
};

export default CAL_P_01;
