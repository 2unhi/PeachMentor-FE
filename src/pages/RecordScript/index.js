import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaVolumeUp } from "react-icons/fa";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";

// API 연동은 임시로 지정해놓음
const RecordScript = ({ selectedDate }) => {
  const [userScript, setUserScript] = useState(null);
  const [aiScript, setAiScript] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [userAudioUrl, setUserAudioUrl] = useState(null);
  const [aiAudioUrl, setAiAudioUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `/api/user-script?date=${selectedDate}`
        );
        const aiResponse = await axios.get(
          `/api/ai-script?date=${selectedDate}`
        );
        const feedbackResponse = await axios.get(
          `/api/feedback?date=${selectedDate}`
        );

        setUserScript(userResponse.data.script);
        setAiScript(aiResponse.data.script);
        setFeedback(feedbackResponse.data.feedback);

        setUserAudioUrl(userResponse.data.audioUrl);
        setAiAudioUrl(aiResponse.data.audioUrl);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />

      <main className="flex flex-col items-center flex-1 w-full p-4 mt-4 mb-16 space-y-6">
        <div className="relative w-full max-w-md p-4 bg-white border rounded shadow border-grayscale-30">
          <h2 className="text-base font-semibold">개인 스크립트</h2>
          <p className="text-grayscale-90">{userScript}</p>
          <button
            onClick={() => playAudio(userAudioUrl)}
            className="absolute text-xl top-4 right-4"
          >
            <FaVolumeUp />
          </button>
        </div>

        <div className="relative w-full max-w-md p-4 bg-white border rounded shadow border-grayscale-30">
          <h2 className="text-base font-semibold">AI가 수정한 스크립트</h2>
          <p className="text-grayscale-90">{aiScript}</p>
          <button
            onClick={() => playAudio(aiAudioUrl)}
            className="absolute text-xl top-4 right-4"
          >
            <FaVolumeUp />
          </button>
        </div>

        <div className="w-full max-w-md p-4 bg-white border rounded shadow border-grayscale-30">
          <h2 className="text-base font-semibold">AI 피드백</h2>
          <p className="text-grayscale-90">{feedback}</p>
        </div>
      </main>

      <NavBar />
    </div>
  );
};

export default RecordScript;
