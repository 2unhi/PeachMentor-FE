import React, { useState } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Countdown from "./components/Countdown";
import Question from "./components/Question";
import ProgressTimer from "./components/ProgressTimer";

const Main = () => {
  const [showCountdown, setShowCountdown] = useState(false);
  const [showProgressTimer, setShowProgressTimer] = useState(false);

  const handleQuestionClick = () => {
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setShowProgressTimer(true); // 1분 타이머 시작
  };

  const handleProgressTimeUp = () => {
    alert("1분이 종료되었습니다!");
    setShowProgressTimer(false);
  };

  const questionText =
    "당신은 어떤 도형을 닮은 것 같나요? 그 도형을 닮은 이유는 무엇인가요? 1분 동안 말해보세요!";

  return (
    <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-[#fcfcfc]">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow px-4">
        {showCountdown || showProgressTimer ? (
          <Question questionText={questionText} />
        ) : (
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

        {/* 1분 타이머 표시 */}
        {showProgressTimer && (
          <ProgressTimer duration={1} onTimeUp={handleProgressTimeUp} />
        )}
      </main>
      <NavBar />
    </div>
  );
};

export default Main;
