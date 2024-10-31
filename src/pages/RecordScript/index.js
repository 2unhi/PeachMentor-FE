import React, { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";

// 스크립트 확인을 위한 임시 더미 데이터
const RecordScript = ({ selectedDate }) => {
  const [userScript] = useState(
    "사용자의 더미 스크립트 내용이 여기에 들어갑니다. " +
      "이 내용은 예시로 보여주기 위한 더미 텍스트입니다. 스크립트 내용이 길어질 경우 어떻게 표시되는지 확인할 수 있습니다. ".repeat(
        3
      )
  );
  const [aiScript] = useState(
    "AI가 수정한 더미 스크립트 내용이 여기에 들어갑니다. " +
      "이 내용은 예시로 보여주기 위한 더미 텍스트입니다. 스크립트 내용이 길어질 경우 어떻게 표시되는지 확인할 수 있습니다. ".repeat(
        3
      )
  );
  const [feedback] = useState(
    "AI 피드백의 더미 내용이 여기에 들어갑니다. " +
      "이 내용은 예시로 보여주기 위한 더미 텍스트입니다. 스크립트 내용이 길어질 경우 어떻게 표시되는지 확인할 수 있습니다. ".repeat(
        3
      )
  );

  // 임시 오디오 URL
  const userAudioUrl = "/path/to/user-audio.mp3";
  const aiAudioUrl = "/path/to/ai-audio.mp3";

  const [isUserScriptOpen, setIsUserScriptOpen] = useState(false);
  const [isAiScriptOpen, setIsAiScriptOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const toggleUserScript = () => setIsUserScriptOpen(!isUserScriptOpen);
  const toggleAiScript = () => setIsAiScriptOpen(!isAiScriptOpen);
  const toggleFeedback = () => setIsFeedbackOpen(!isFeedbackOpen);

  return (
    <div className="flex flex-col items-center min-h-screen overflow-y-auto">
      <Header />

      <main className="flex flex-col items-center flex-1 w-full max-h-screen p-4 mt-4 mb-16 space-y-6 overflow-y-auto">
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
      </main>

      <NavBar />
    </div>
  );
};

export default RecordScript;
