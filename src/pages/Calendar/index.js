import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import { FaCheckCircle } from "react-icons/fa";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState(new Array(31).fill(0)); // 답변 완료 여부를 저장

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchCalendarData = async (year, month) => {
    try {
      const response = await axios.get(`/api/spring/calendars`, {
        params: { year, month },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.isSuccess) {
        setMarkedDates(response.data.result);
      } else {
        console.error("데이터 가져오기 실패", response.data.message);
      }
    } catch (error) {
      console.error("API 요청 오류", error);
    }
  };

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    fetchCalendarData(year, month);
  }, [selectedDate]);

  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const today = new Date();
      // 오늘 날짜
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return "bg-pink-100 text-pink-700 font-semibold";
      }
      // 선택된 날짜
      if (
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        return "bg-primary-50 text-white font-semibold";
      }
    }
    return "hover:bg-grayscale-20 transition";
  };

  return (
    <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-white">
      <Header />
      <div className="flex flex-col items-center flex-grow p-4">
        <div className="flex justify-center items-center w-full py-4 mb-[-4px]">
          <h1 className="px-4 py-2 text-base font-bold rounded-lg text-grayscale-90 bg-grayscale-10">
            날짜를 선택하면 당일 피드백을 확인할 수 있어요
          </h1>
        </div>

        <div className="w-full max-w-[400px] mt-4">
          <Calendar
            onChange={handleDateChange} // 날짜 선택 시 상태 업데이트
            onActiveStartDateChange={({ activeStartDate }) => {
              const year = activeStartDate.getFullYear();
              const month = activeStartDate.getMonth() + 1;
              fetchCalendarData(year, month);
            }}
            value={selectedDate}
            className="w-full calendar-custom"
            tileClassName={getTileClassName}
            formatDay={(locale, date) => date.getDate()}
            tileContent={({ date, view }) => {
              if (view === "month" && markedDates[date.getDate() - 1] !== 0) {
                return (
                  <div className="relative flex items-center justify-center px-4 py-2">
                    <FaCheckCircle
                      className="absolute text-green-500 bottom-1 right-1"
                      size={14}
                    />
                  </div>
                );
              }
            }}
          />
        </div>
      </div>
      <NavBar />

      {/* 리액트 캘린더 라이브러리 커스텀 */}
      <style jsx>{`
        .calendar-custom .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
        }

        .calendar-custom .react-calendar__tile {
          padding: 20px;
          font-size: 1rem;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 오늘 날짜 스타일 */
        .calendar-custom .react-calendar__tile--now {
          background: #ffdce5; /* 연분홍색 배경 */
          color: #c2185b;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
