import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axios/TokenInterceptor";
import { SPRING_API_URL } from "../constants/api";
import { NotificationContext } from "../context/NotificationProvider";

const Header = () => {
  const navigate = useNavigate();
  const {
    isNewReport,
    setIsNewReport,
    analysisText,
    setAnalysisText,
    firstDate,
    setFirstDate,
    lastDate,
    setLastDate,
  } = useContext(NotificationContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleGetReport = async () => {
      try {
        const response = await instance.get(`${SPRING_API_URL}/analysis`);
        if (response.data.isSuccess) {
          if (response.data.code === "STATISTICS2003") {
            const newAnalysisText = response.data.result.analysisText;
            const firstDate = response.data.result.firstDate;
            const lastDate = response.data.result.lastDate;
            if (newAnalysisText !== analysisText) {
              setIsNewReport(true);
              setAnalysisText(newAnalysisText);
              setFirstDate(firstDate);
              setLastDate(lastDate);
            }
            console.log("유저 7일 분석 레포트 받아오기 완료");
          } else {
            console.error("유저 7일 분석 레포트 받아오기 api 오류");
          }
        } else {
          console.error("서버 에러");
        }
      } catch (error) {
        console.error("유저 7일 분석 레포트 받아오기 실패");
      }
    };

    handleGetReport();
  }, [
    analysisText,
    setIsNewReport,
    setAnalysisText,
    setFirstDate,
    setLastDate,
  ]);

  // Header의 복숭아멘토 텍스트 클릭 시 메인 페이지로 이동
  const handleLogoClick = async () => {
    let isCompleteSpeech = false;
    let selfFeedback = null;

    try {
      const response = await instance.get(
        `${SPRING_API_URL}/feedbacks/completions`
      );
      if (response.data.isSuccess) {
        if (
          response.data.code === "USER4002" ||
          response.data.code === "ACCESSTOKEN4002"
        ) {
          console.error("오늘 답변 했는 지 여부 받아오기 API 서버 에러");
        } else {
          if (response.data.result.speechExists) {
            isCompleteSpeech = true;
          } else {
            isCompleteSpeech = false;
          }
          console.log("오늘 답변 했는 지 여부 받아오기 성공");
        }
      } else {
        console.error("오늘 답변 했는 지 여부 받아오기 실패");
      }
    } catch (error) {
      console.error("오늘 답변 했는 지 여부 받아오기 실패");
    }

    try {
      const response = await instance.get(
        `${SPRING_API_URL}/self-feedbacks/latest-feedbacks`
      );
      if (response.data.isSuccess) {
        if (
          response.data.code === "ANSWER4001" ||
          response.data.code === "SELFFEEDBACK4001"
        ) {
        } else {
          selfFeedback = response.data.result.feedback;
          console.log("이전 셀프 피드백 받아오기 성공");
        }
      } else {
        console.error("이전 셀프 피드백 받아오기 실패");
      }
    } catch (error) {
      console.error("이전 셀프 피드백 받아오기 실패");
    }
    navigate(
      `/main?selfFeedback=${selfFeedback}&isCompleteSpeech=${isCompleteSpeech}`
    );
  };
  const handleCloseNotification = () => {
    setIsNewReport(false);
  };

  const handleClickNotification = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-primary-50 w-full max-w-[500px] mx-auto">
        <h1
          className="text-3xl font-bold text-white cursor-pointer font-paperlogy-heading"
          onClick={handleLogoClick}
        >
          복숭아멘토
        </h1>
        <div className="flex items-center gap-3">
          <img
            src="/images/notification.svg"
            alt="Notification Icon"
            className="cursor-pointer w-7 h-7"
            onClick={handleClickNotification}
          />
          <img
            src="/webp/mypage_menu.webp"
            alt="My Page Icon"
            className="w-8 h-8 cursor-pointer"
            onClick={handleMyPageClick}
          />
        </div>
      </header>
      {/* 분석 리포트 모달 (종모양 클릭) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 mx-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {firstDate && lastDate
                ? `${firstDate}~${lastDate} : 분석 리포트`
                : "분석 리포트가 아직 없습니다!"}
            </h2>
            <div className="mb-4 overflow-y-auto" style={{ maxHeight: "50vh" }}>
              <pre className="whitespace-pre-wrap">{analysisText}</pre>
            </div>
            <button
              className="px-4 py-2 text-white rounded bg-primary-50"
              onClick={handleCloseModal}
            >
              닫기
            </button>
          </div>
        </div>
      )}
      {isNewReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 text-center bg-white rounded-lg shadow-lg">
            <p className="mb-4 text-lg font-bold">
              새로운 분석 리포트가 도착했습니다!
            </p>
            <button
              className="px-4 py-2 text-white rounded bg-primary-50"
              onClick={handleCloseNotification}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
