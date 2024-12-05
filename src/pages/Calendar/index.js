import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import instance from "../../axios/TokenInterceptor";
import { SPRING_API_URL } from "../../constants/api";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationProvider";

const CalendarPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState(new Array(32).fill(null));

  const { isNewReport, setIsNewReport } = useContext(NotificationContext);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const answerId = markedDates[date.getDate() - 1]?.answerId; // 안전하게 데이터 접근
    if (answerId > 0) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      const formattedDate = newDate.toISOString().split("T")[0];
      navigate(`/feedback?answerId=${answerId}&date=${formattedDate}`);
    } else {
      console.log("해당 날짜에 스피치를 진행하지 않았습니다.");
    }
  };

  const fetchCalendarData = async (year, month) => {
    try {
      const response = await instance.get(`${SPRING_API_URL}/calendars`, {
        params: { year, month },
      });
      if (response.data.isSuccess) {
        const updatedDates = new Array(32).fill(null); // 초기화
        response.data.result.forEach((answerId, index) => {
          if (answerId !== 0) {
            const fullDate = new Date(year, month - 1, index + 1); // 날짜 계산
            updatedDates[index] = { date: fullDate, answerId }; // 날짜와 answerId를 객체로 저장
          }
        });
        setMarkedDates(updatedDates);
        console.log("달력 정보 가져오기 성공");
      } else {
        console.error("달력 정보 가져오기 실패", response.data.message);
      }
    } catch (error) {
      console.error("달력 정보 가져오기 요청 오류", error);
    }
  };

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    fetchCalendarData(year, month);
  }, [selectedDate]);

  const getTileClassName = ({ date, view }) => {
    const today = new Date();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 주말 (0: 일요일, 6: 토요일)

    if (view === "month") {
      // 오늘 날짜
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return "text-pink-700 font-semibold";
      }
      // 선택된 날짜
      if (
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        return "font-semibold";
      }
      if (isWeekend) {
        return "text-black"; // 검정색 텍스트
      }
    }
    return "hover:bg-grayscale-20 transition";
  };

  const handleCloseNotification = () => {
    setIsNewReport(false);
  };

  return (
    <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-white">
      {isNewReport && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex flex-col items-center text-xl font-semibold text-center text-white font-paperlogy-heading">
            <div className="mt-6 mb-6 animate-floating">
              <p>
                🖐🏻 잠깐 🖐🏻 <br />
                새로운 분석 리포트가 도착했습니다! <br />
                상단의 종 아이콘을 눌러 확인해주세요!
              </p>
            </div>
            <button
              className="px-8 py-4 mt-4 text-lg font-semibold text-black rounded-full bg-primary-20"
              onClick={handleCloseNotification}
            >
              확인하러 가기
            </button>
          </div>
        </div>
      )}
      <Header />
      <div className="flex flex-col items-center flex-grow p-4">
        <div className="flex justify-center items-center w-full pt-4 mb-[-4px]">
          <h1 className="px-4 py-2 text-base font-bold rounded-lg text-grayscale-90 bg-grayscale-10">
            날짜를 선택하면 당일 피드백을 확인할 수 있어요
          </h1>
        </div>

        <div className="mt-4 text-sm font-bold text-center text-grayscale-70">
          스피치를 진행한 날은{" "}
          <img
            src="/images/peach3.png"
            alt="복숭아 이미지"
            className="inline-block w-6 h-6"
          />{" "}
          로 표시됩니다!
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
              if (view === "month") {
                const markedData = markedDates[date.getDate() - 1];
                const isMarked =
                  markedData &&
                  markedData.date.toDateString() === date.toDateString() && // 날짜 비교 (문자열 형태)
                  markedData.answerId !== 0;
                if (isMarked) {
                  return (
                    <div className="relative flex items-center justify-center px-4 py-2">
                      <div
                        className="tile-background"
                        style={{
                          backgroundImage: "url('/images/peach3.png')",
                        }}
                      ></div>
                      <span className="date-number">{date.getDate()}</span>
                    </div>
                  );
                } else {
                  return (
                    <div className="flex items-center justify-center">
                      <span>{date.getDate()}</span>
                    </div>
                  );
                }
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
          padding: 16px;
          font-size: 1rem;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative; /* 배경 이미지를 tile 내부에서 관리 */
        }

        /* 배경 이미지 추가 (워터마크처럼) */
        .calendar-custom .react-calendar__tile .tile-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: 100% 100%; /* 배경 이미지를 100% 크기로 설정 */
          background-position: center;
          opacity: 0.7; /* 배경 이미지 투명도 */
          z-index: 0; /* 이미지가 셀의 내용 아래에 위치하도록 설정 */
        }

        /* 오늘 날짜 스타일 (붉은 글씨 유지) */
        .calendar-custom .react-calendar__tile--now {
          background: none;
          color: #c2185b !important; /* 붉은 색 유지 */
          font-weight: bold !important;
        }

        /* 선택된 날짜 스타일 */
        .calendar-custom .react-calendar__tile--active {
          background-color: transparent !important;
          color: inherit;
          font-weight: inherit;
        }

        .calendar-custom .react-calendar__tile .date-number {
          z-index: 1;
          font-size: 16px;
        }

        /* 날짜 숫자 제거 */
        .calendar-custom .react-calendar__tile abbr {
          display: none; /* 기본 날짜 숫자 숨기기 */
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
