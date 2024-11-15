import React, { useState } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { useRecordContext } from "../../context/RecordContext";
import AISpeechPopup from "../Main/components/AISpeechPopup";
import ScriptBox from "./components/ScriptBox";
import SelfFeedbackPopup from "./components/SelfFeedbackPopup";

const userImage = "/images/record_user.png";
const aiImage = "/images/record_ai.png";
const feedbackImage = "/images/record_feedback.png";

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
  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false); // 셀프 피드백 팝업 상태
  const [activeAudio, setActiveAudio] = useState(null);

  const playAudioWithGauge = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
    setActiveAudio(audioUrl);
    audio.onended = () => setActiveAudio(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen max-w-[500px] w-full overflow-y-auto bg-[#f9f9f9]">
      <Header />
      <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-white">
        <div className="flex flex-col items-center flex-1 w-full p-4 mt-4 mb-16 space-y-6">
          <div className="flex mb-4 space-x-8">
            {/* AI 답변 보기 버튼 */}
            <button
              onClick={() => setIsPopupOpen(true)}
              className="flex-1 py-4 text-lg font-semibold text-white rounded-full px-7 bg-primary-50 whitespace-nowrap"
            >
              AI 답변 보기
            </button>

            {/* 셀프 피드백 체크 버튼 */}
            <button
              onClick={() => setIsFeedbackPopupOpen(true)}
              className="flex-1 py-4 text-lg font-semibold text-white rounded-full px-7 bg-primary-50 whitespace-nowrap"
            >
              피드백 체크
            </button>
          </div>

          {/* 상단 메시지 */}
          <div className="relative flex flex-col w-full max-w-md px-4 py-2 rounded-md bg-grayscale-10">
            <p className="text-base font-paperlogy-title font-regular">
              오늘 하루도 복숭아멘토 챌린지 성공!
            </p>
          </div>

          {/* 사용자 스피치 스크립트 */}
          <ScriptBox
            image={userImage}
            title="내가 말한 스크립트"
            description="간투어, 멈춘 시간 등이 포함됩니다."
            content={userScript}
            audioUrl={userAudioUrl}
            isOpen={isUserScriptOpen}
            toggleOpen={() => setIsUserScriptOpen(!isUserScriptOpen)}
            playAudioWithGauge={playAudioWithGauge}
            activeAudio={activeAudio}
            duration={15}
          />

          {/* AI 수정 스크립트 */}
          <ScriptBox
            image={aiImage}
            title="AI가 수정한 스크립트"
            description="내가 말한 스크립트를 AI가 직접 수정했어요."
            content={aiScript}
            audioUrl={aiAudioUrl}
            isOpen={isAiScriptOpen}
            toggleOpen={() => setIsAiScriptOpen(!isAiScriptOpen)}
            playAudioWithGauge={playAudioWithGauge}
            activeAudio={activeAudio}
            duration={15}
          />

          {/* AI 피드백 */}
          <ScriptBox
            image={feedbackImage}
            title="AI 피드백"
            description="복숭아멘토의 상세한 피드백을 확인하세요!"
            content={feedback}
            audioUrl={null}
            isOpen={isFeedbackOpen}
            toggleOpen={() => setIsFeedbackOpen(!isFeedbackOpen)}
          />
        </div>
        <NavBar />
      </div>

      {/* AI 답변 팝업 */}
      <AISpeechPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        response={aiResponses}
      />

      {/* 셀프 피드백 팝업 */}
      <SelfFeedbackPopup
        isOpen={isFeedbackPopupOpen}
        onClose={() => setIsFeedbackPopupOpen(false)}
      />
    </div>
  );
};

export default RecordScript;
