import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Countdown from "./components/Countdown";
import Question from "./components/Question";
import ProgressTimer from "./components/ProgressTimer";
import Record from "../../components/Record";
import VolumeVisualizer from "./components/VolumeVisualizer";
import AISpeechPopup from "./components/AISpeechPopup";

const Main = () => {
  const [showCountdown, setShowCountdown] = useState(false);
  const [showProgressTimer, setShowProgressTimer] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showAISpeechPopup, setShowAISpeechPopup] = useState(false);
  const [showAnalysisMessage, setShowAnalysisMessage] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const aiResponse = "오늘의 질문에 대해 AI가 답변한 내용"; // 이후에 GPT와 연동 (임시로 텍스트 삽입)

  const handleQuestionClick = () => {
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setShowProgressTimer(true); // 1분 타이머 시작
    setIsRecording(true); // 녹음 시작
  };

  const handleProgressTimeUp = () => {
    setShowProgressTimer(false);
    setIsRecording(false); // 녹음 중지
    setShowAnalysisMessage(true); // 분석 메시지 표시
    setLoading(true); // 로딩 시작
    // 2초 후 로딩 종료 (예시)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleCloseAISpeechPopup = () => {
    setShowAISpeechPopup(false); // 팝업 닫기
  };

  const handleShowAISpeechPopup = () => {
    setShowAISpeechPopup(true); // AI 답변 팝업 열기
  };

  const questionText =
    "당신은 어떤 도형을 닮은 것 같나요?\n그 도형을 닮은 이유는 무엇인가요?\n1분 동안 말해보세요!";

  return (
    <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-[#fcfcfc]">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow px-4">
        {!showAnalysisMessage && !showProgressTimer && !showCountdown && (
          <button
            onClick={handleQuestionClick}
            className="px-6 py-4 mt-6 text-lg text-white rounded bg-primary-50 font-paperlogy-title"
          >
            오늘의 질문
          </button>
        )}

        {(showCountdown || showProgressTimer) && (
          <Question questionText={questionText} />
        )}

        {showCountdown && (
          <Countdown onCountdownComplete={handleCountdownComplete} />
        )}

        {showProgressTimer && (
          <>
            <ProgressTimer duration={1} onTimeUp={handleProgressTimeUp} />
            <Record />
            <VolumeVisualizer isRecording={isRecording} />
          </>
        )}

        {showAnalysisMessage && (
          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-xl font-semibold text-center text-grayscale-100">
              답변 내용을 분석 중입니다
            </p>
            {loading ? ( // 로딩 상태에 따른 표시
              <div className="mt-4 loader" /> // 로딩 애니메이션
            ) : (
              <button
                onClick={handleShowAISpeechPopup}
                className="px-6 py-2 mt-8 font-semibold text-white rounded-full bg-primary-50"
              >
                AI 답변 보기
              </button>
            )}
          </div>
        )}

        <AISpeechPopup
          isOpen={showAISpeechPopup}
          onClose={handleCloseAISpeechPopup}
          response={aiResponse}
        />
      </main>
      <NavBar />
    </div>
  );
};

export default Main;
