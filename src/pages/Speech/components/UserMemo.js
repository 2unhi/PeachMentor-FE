import React, { useState, useRef } from "react";
import instance from "../../../axios/TokenInterceptor";
import { SPRING_API_URL } from "../../../constants/api";
import { FaPause, FaPlay } from "react-icons/fa";

const UserMemo = ({ audioUrl }) => {
  const [memo, setMemo] = useState("");
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태 추가
  const audioRef = useRef(null); // 오디오 엘리먼트 참조
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 관리
  const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간
  const [duration, setDuration] = useState(0); // 오디오 길이

  const handleSubmit = async () => {
    try {
      const answerId = localStorage.getItem("answerId");
      if (!answerId) {
        console.error("answerId가 null입니다. 저장을 진행할 수 없습니다.");
        alert("answerId가 설정되지 않았습니다. 다시 시도해주세요.");
        return; // answerId가 없으면 요청 차단
      }

      const response = await instance.post(
        `${SPRING_API_URL}/self-feedbacks?answerId=${answerId}`,
        { feedback: memo }
      );

      if (response.data.isSuccess) {
        console.log("셀프 피드백 제출 성공");
        setShowPopup(true); // 팝업 표시
      } else {
        console.error("셀프 피드백 제출 오류");
        console.log(response.data.code);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("셀프 피드백 제출 실패:", error);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="w-[80%] mt-10 p-3 rounded-lg bg-primary-00 flex flex-col space-y-2">
        <p className="text-lg font-bold text-center font-paperlogy-title">
          나만의 메모장
        </p>
        {/* 오디오 재생 컨트롤 */}
        {audioUrl && (
          <div className="flex items-center">
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
            <button
              onClick={togglePlayPause}
              className="p-2 mr-3 text-white rounded-full bg-primary-50 focus:outline-none"
            >
              {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
            </button>
            <div className="relative flex-1 h-1 mr-3 bg-gray-300 rounded-full">
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-primary-50"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              ></div>
            </div>
            <span className="text-sm text-grayscale-80 font-paperlogy-title">
              {formatTime(duration - currentTime)}
            </span>
          </div>
        )}

        {/* 메모장 */}
        <textarea
          className="w-full h-24 p-2 text-sm border rounded resize-none border-grayscale-40"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="오디오 버튼을 통해 녹음 내용을 다시 들어보며 스스로 평가해보세요!"
        />

        {/* 저장 버튼 */}
        <button
          onClick={handleSubmit}
          className="self-end px-3 py-1 text-sm font-semibold text-black rounded bg-primary-30 hover:bg-primary-40"
        >
          저장
        </button>

        {/* 저장 시 나오는 팝업 */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative max-w-sm p-6 bg-white rounded-lg shadow-lg">
              <img
                src="/webp/close_button_x.webp"
                alt="닫기"
                className="absolute w-6 h-6 cursor-pointer top-2 right-2"
                onClick={() => setShowPopup(false)}
              />
              <p className="text-base font-bold text-center font-paperlogy-title text-primary-50">
                셀프 피드백 저장이 완료되었습니다!
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMemo;
