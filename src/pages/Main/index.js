import React, { useState } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Countdown from "./components/Countdown";
import Question from "./components/Question";

const Main = () => {
  const [showCountdown, setShowCountdown] = useState(false);

  const handleQuestionClick = () => {
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    alert("1분 타이머를 시작합니다!");
    setShowCountdown(false);
  };

  // 예시 질문 목록
  const questions = [
    "당신은 어떤 도형을 닮은 것 같나요? 그 도형을 닮은 이유는 무엇인가요? 1분동안 말해보세요!",
    "최근에 가장 행복했던 순간은 언제인가요? 그 이유를 설명해보세요.",
    "자신이 좋아하는 색깔은 무엇인가요? 왜 그 색깔을 좋아하나요?",
    "어릴 적 가장 기억에 남는 여행은 무엇인가요? 그 이유는 무엇인가요?",
  ];

  // 현재 날짜의 일을 기준으로 질문 선택
  const today = new Date();
  const questionIndex = today.getDate() % questions.length;
  const questionText = questions[questionIndex];

  return (
    <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-[#fcfcfc]">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow px-4">
        {/* 오늘의 질문 */}
        {showCountdown && <Question questionText={questionText} />}

        {/* 오늘의 질문 버튼 */}
        {!showCountdown && (
          <button
            onClick={handleQuestionClick}
            className="px-6 py-4 mt-6 text-lg text-white rounded bg-primary-50 font-paperlogy-title"
          >
            오늘의 질문
          </button>
        )}

        {/* 카운트다운 표시 */}
        {showCountdown && (
          <Countdown onCountdownComplete={handleCountdownComplete} />
        )}
      </main>
      <NavBar />
    </div>
  );
};

export default Main;
