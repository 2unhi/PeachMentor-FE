import React, { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { useRecordContext } from "../../context/RecordContext";
import AISpeechPopup from "../Main/components/AISpeechPopup";

// 스크립트 확인을 위한 임시 더미 데이터
const RecordScript = ({ selectedDate }) => {
  // feedback 관련 상태 전부 Context 관리
  const {
    userAudioUrl,
    aiAudioUrl,
    userScript,
    aiScript,
    feedback,
    aiResponses,
  } = useRecordContext();

  const [isUserScriptOpen, setIsUserScriptOpen] = useState(false);
  const [isAiScriptOpen, setIsAiScriptOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // AI 답변 팝업 상태

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const toggleUserScript = () => setIsUserScriptOpen(!isUserScriptOpen);
  const toggleAiScript = () => setIsAiScriptOpen(!isAiScriptOpen);
  const toggleFeedback = () => setIsFeedbackOpen(!isFeedbackOpen);

  return (
    <div className="flex flex-col items-center min-h-screen max-w-[500px] w-full overflow-y-auto bg-[#f9f9f9]">
      <Header />
      <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-white">
        <div className="flex flex-col items-center flex-1 w-full max-h-screen p-4 mt-4 mb-16 space-y-6 overflow-y-auto">
          {/* AI 답변 보기 버튼 */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-6 py-3 text-lg font-semibold text-white rounded-full bg-primary-50"
          >
            AI 답변 보기
          </button>

          {/* 사용자 스피치 스크립트 */}
          <div
            className="relative w-full max-w-md p-4 bg-white border rounded shadow cursor-pointer border-grayscale-30"
            onClick={toggleUserScript}
            style={{
              height: isUserScriptOpen ? "auto" : "4rem",
              transition: "height 0.3s ease",
            }}
          >
            <h2 className="text-base font-semibold">개인 스크립트</h2>
            {isUserScriptOpen && (
              <p className="mt-2 text-grayscale-90">{userScript}</p>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playAudio(userAudioUrl);
              }}
              className="absolute text-xl top-4 right-4"
            >
              <FaVolumeUp />
            </button>
          </div>

          {/* AI 수정 스피치 스크립트 */}
          <div
            className="relative w-full max-w-md p-4 bg-white border rounded shadow cursor-pointer border-grayscale-30"
            onClick={toggleAiScript}
            style={{
              height: isAiScriptOpen ? "auto" : "4rem",
              transition: "height 0.3s ease",
            }}
          >
            <h2 className="text-base font-semibold">AI가 수정한 스크립트</h2>
            {isAiScriptOpen && (
              <p className="mt-2 text-grayscale-90">{aiScript}</p>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playAudio(aiAudioUrl);
              }}
              className="absolute text-xl top-4 right-4"
            >
              <FaVolumeUp />
            </button>
          </div>

          {/* AI 피드백 */}
          <div
            className="relative w-full max-w-md p-4 bg-white border rounded shadow cursor-pointer border-grayscale-30"
            onClick={toggleFeedback}
            style={{
              height: isFeedbackOpen ? "auto" : "4rem",
              transition: "height 0.3s ease",
            }}
          >
            <h2 className="text-base font-semibold">AI 피드백</h2>
            {isFeedbackOpen && (
              <p className="mt-2 text-grayscale-90">{feedback}</p>
            )}
          </div>
        </div>
        <NavBar />
      </div>

      {/* AI 답변 팝업 */}
      <AISpeechPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        response={aiResponses} // Context에서 전달된 AI 답변 사용
      />
    </div>
  );
};

export default RecordScript;
