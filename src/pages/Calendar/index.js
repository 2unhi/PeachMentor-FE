import React, { useState } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCheckCircle } from "react-icons/fa";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates] = useState([]); // 테스트 목적으로 빈 배열로 초기화

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // 날짜 스타일을 적용하는 함수
  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const today = new Date();
      // 오늘 날짜 스타일
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return "bg-pink-100 text-pink-700 font-semibold";
      }

      // 선택된 날짜 스타일
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
            value={selectedDate} // 선택된 날짜를 상태로 관리
            className="w-full calendar-custom"
            tileClassName={getTileClassName}
            formatDay={(locale, date) => date.getDate()}
            tileContent={({ date, view }) => {
              if (view === "month") {
                const isMarked = markedDates.includes(
                  `${date.getFullYear()}-${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${date
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`
                );

                return (
                  <div className="relative flex items-center justify-center px-4 py-2">
                    {isMarked && (
                      <FaCheckCircle
                        className="absolute text-green-500 bottom-1 right-1"
                        size={14}
                      />
                    )}
                  </div>
                );
              }
            }}
          />
        </div>
      </div>
      <NavBar />

      {/* 요일 밑줄 제거 */}
      <style jsx>{`
        .calendar-custom .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
