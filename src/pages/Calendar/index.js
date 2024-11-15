import React, { useState } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-[#fcfcfc]">
      <Header />
      <div className="flex flex-col items-center flex-grow p-4">
        <div className="flex justify-center items-center w-full py-4 mb-[-2px]">
          <h1 className="text-2xl font-bold text-grayscale-90">나의 기록</h1>
        </div>

        <div className="w-full max-w-[400px] rounded-xl">
          <Calendar
            onChange={handleDateChange} // 날짜 선택 시 상태 업데이트
            value={selectedDate} // 선택된 날짜를 상태로 관리
            className="w-full"
            tileClassName={({ date, view }) =>
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getFullYear() === selectedDate.getFullYear()
                ? "bg-primary-100 text-white font-semibold rounded-full"
                : "hover:bg-gray-100 rounded-full transition duration-150"
            }
            formatDay={(locale, date) => (
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium">{date.getDate()}</span>
              </div>
            )}
          />
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default CalendarPage;
