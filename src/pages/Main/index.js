import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import mainAnimations from "../../components/animations/mainAnimation.json";
import analysisAnimation from "../../components/animations/analysisAnimation.json";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Countdown from "./components/Countdown";
import Question from "./components/Question";
import ProgressTimer from "./components/ProgressTimer";
import Record from "./components/Record";
import VolumeVisualizer from "./components/VolumeVisualizer";
import AISpeechPopup from "./components/AISpeechPopup";
import UserMemo from "./components/UserMemo";
import { SPRING_API_URL } from "../../constants/api";
import instance from "../../axios/TokenInterceptor";
import { useNavigate } from "react-router-dom";
import SelfFeedback from "./components/SelfFeedback";
import CustomAudioPlayer from "./components/CustomAudioPlayer";

const Main = () => {
  const navigate = useNavigate();

  const [showCountdown, setShowCountdown] = useState(false);
  const [showProgressTimer, setShowProgressTimer] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showAISpeechPopup, setShowAISpeechPopup] = useState(false);
  const [showAnalysisMessage, setShowAnalysisMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insightComplete, setInsightComplete] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showSelfFeedback, setShowSelfFeedback] = useState(false);

  const [answerId, setAnswerId] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [onRec, setOnRec] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [selfFeedback, setSelfFeedback] = useState("");

  useEffect(() => {
    const getBeforeSelfFeedback = async () => {
      try {
        const response = await instance.get(
          `${SPRING_API_URL}/self-feedbacks/latest-feedbacks`
        );
        if (response.data.isSuccess) {
          if (
            response.data.code === "ANSWER4001" ||
            response.data.code === "SELFFEEDBACK4001"
          ) {
            setShowSelfFeedback(false);
          } else {
            setSelfFeedback(response.data.result.feedback);
            setShowSelfFeedback(true);
            console.log("이전 셀프 피드백 받아오기 성공");
          }
        }
      } catch (error) {
        console.error("이전 셀프 피드백 받아오기 실패");
      }
    };
    getBeforeSelfFeedback();
  }, []);

  useEffect(() => {
    if (answerId) {
      localStorage.setItem("answerId", answerId);
    }
  }, [answerId]);

  const handleQuestionClick = async () => {
    try {
      const response = await instance.get(`${SPRING_API_URL}/questions`);
      if (response.data.isSuccess) {
        setQuestionText(response.data.result.questionDescription);
        setAnswerId(response.data.result.answerId);
        setShowSelfFeedback(false);
        console.log("질문 받아오기 성공");
      } else {
        console.error("질문 받아오기 오류");
        console.log(response.data.code);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("질문 받아오기 실패");
    }

    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setShowProgressTimer(true); // 1분 타이머 시작
    setIsRecording(true); // 녹음 시작
  };

  const handleStopRecording = async () => {
    setIsRecording(false); // 녹음 중지
    setOnRec(true);
  };

  const handleProgressTimeUp = async () => {
    setShowProgressTimer(false);
    setLoading(true); // 로딩 시작
    setShowAnalysisMessage(true); // 분석 메시지 표시
  };

  const handleCloseAISpeechPopup = () => {
    setShowAISpeechPopup(false); // 팝업 닫기
  };

  const handleShowAISpeechPopup = async () => {
    setShowAISpeechPopup(true); // AI 답변 팝업 열기
  };

  // NavBar를 숨기는 녹음 과정 선언
  const shouldHideNavBar = showCountdown || showProgressTimer || loading;

  return (
    <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-white">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow px-4">
        {/* 이전 스피치에서의 셀프 피드백 */}
        {showSelfFeedback && <SelfFeedback selfFeedback={selfFeedback} />}

        {/* "오늘의 질문" 버튼 */}
        {!showAnalysisMessage && !showProgressTimer && !showCountdown && (
          <button
            onClick={handleQuestionClick}
            className="px-6 py-4 mt-6 text-lg text-white rounded bg-primary-50 font-paperlogy-title"
          >
            오늘의 질문
          </button>
        )}

        {/* 질문 내용 표시 */}
        {(showCountdown || showProgressTimer) && (
          <Question questionText={questionText} />
        )}

        {/* 카운트다운 컴포넌트 */}
        {showCountdown && (
          <Countdown onCountdownComplete={handleCountdownComplete} />
        )}

        {/* 1분 타이머 및 녹음 컴포넌트 */}
        {showProgressTimer && (
          <>
            <ProgressTimer duration={1} onTimeUp={handleStopRecording} />
            <Record
              setAudioUrl={setAudioUrl}
              isRecording={isRecording}
              onRec={onRec}
              setOnRec={setOnRec}
              answerId={answerId}
              questionText={questionText}
              onResponse={(response) => setAiResponse(response)}
              setInsightComplete={setInsightComplete}
              setAnalysisComplete={setAnalysisComplete}
              handleProgressTimeUp={handleProgressTimeUp}
              handleStopRecording={handleStopRecording}
            />
            <VolumeVisualizer isRecording={isRecording} />
          </>
        )}

        {/* 메인 시작 페이지 돋보기 애니메이션 */}
        {!showAnalysisMessage && !showProgressTimer && !showCountdown && (
          <div className="w-3/4 mt-14">
            <Lottie
              loop
              animationData={mainAnimations}
              play
              style={{ width: "100%", maxWidth: "300px", height: "auto" }}
            />
          </div>
        )}

        {/* 분석 중일 때 로딩 상태 표시 */}
        {loading && (
          <div className="flex flex-col items-center justify-center mt-4 max-w-[90%]">
            <p className="mb-3 text-xl font-semibold text-center font-paperlogy-title text-grayscale-100">
              답변 내용을 상세히 분석 중입니다
            </p>
            {audioUrl && <CustomAudioPlayer audioUrl={audioUrl} />}

            {/* 분석 애니메이션 */}
            <div className="flex items-center justify-center -mt-16 transform translate-x-[-12px]">
              <Lottie
                loop
                animationData={analysisAnimation}
                play
                style={{ width: "70%", height: "auto" }}
              />
            </div>

            {/* AI 답변 보기 및 피드백 받기 버튼 */}
            <div className="flex justify-center -mt-12 space-x-4">
              <button
                onClick={handleShowAISpeechPopup}
                className={`px-6 py-3 text-lg font-semibold text-white rounded-full ${
                  insightComplete
                    ? "bg-primary-50"
                    : "bg-primary-10 cursor-not-allowed"
                }`}
                disabled={!insightComplete}
              >
                AI 답변 보기
              </button>
              {/* 분석이 완료되어야 활성화되는 "피드백 받기" 버튼 */}
              <button
                onClick={() => navigate("/recordscript")}
                className={`px-6 py-3 text-lg font-semibold text-white rounded-full ${
                  analysisComplete
                    ? "bg-primary-50"
                    : "bg-primary-10 cursor-not-allowed"
                }`}
                disabled={!analysisComplete}
              >
                피드백 받기
              </button>
            </div>

            {/* 사용자 개인 평가 메모장 */}
            <UserMemo />
          </div>
        )}

        {/* AI 답변 팝업 */}
        <AISpeechPopup
          isOpen={showAISpeechPopup}
          onClose={handleCloseAISpeechPopup}
          response={aiResponse}
        />
      </main>
      {/* NavBar는 shouldHideNavBar 조건에 따라 렌더링 */}
      {!shouldHideNavBar && <NavBar />}
    </div>
  );
};

export default Main;
