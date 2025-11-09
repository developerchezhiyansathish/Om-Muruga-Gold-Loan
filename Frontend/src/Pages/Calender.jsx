import React from "react";
import { Helmet } from "react-helmet";
import SideBar from "../Layouts/SideBar";
import "../Css/Calender.css";
import Header from "../Layouts/Header";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; 
import MobileBottomMenu from "../Layouts/MobileBottomMenu";

const Calender = () => {
  const handleDateClick = (info) => {
    alert(`You clicked on date: ${info.dateStr}`);
  };

  return (
    <>
      <Helmet>
        <title>Calendar | Om Muruga Gold Loan</title>
      </Helmet>
      <div className="app-section">
        <SideBar />
        <div className="dashboard-container">
          <Header title="Calendar" />

          <div className="calendar-wrapper">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              dateClick={handleDateClick}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,dayGridDay",
              }}
              height="80vh"
            />
          </div>
        </div>
         <MobileBottomMenu />
      </div>
    </>
  );
};

export default Calender;
