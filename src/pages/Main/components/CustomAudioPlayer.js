import React, { useRef, useState } from "react";
import { FaPlay, FaPause, FaUndo, FaRedo } from "react-icons/fa";

const CustomAudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null); // 오디오 엘리먼트 참조
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 관리
  const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간
  const [duration, setDuration] = useState(0); // 오디오 길이

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

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleSkip = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        Math.max(audioRef.current.currentTime + time, 0),
        duration
      );
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
    <div className="flex flex-col items-center w-full max-w-md px-4 py-3 space-y-2 rounded-lg bg-grayscale-05">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        해당 브라우저에서는 오디오 기능을 사용할 수 없습니다.
      </audio>

      {/* 오디오 컨트롤러 */}
      <div className="flex items-center justify-center space-x-6">
        {/* 5초 되감기 버튼 */}
        <button
          onClick={() => handleSkip(-5)}
          className="text-gray-600 hover:text-gray-800"
        >
          <FaUndo size={24} />
        </button>

        {/* 재생/일시정지 버튼 */}
        <button
          onClick={togglePlayPause}
          className="p-3 text-white rounded-full shadow-md bg-primary-50 focus:outline-none"
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>

        {/* 5초 건너뛰기 버튼 */}
        <button
          onClick={() => handleSkip(5)}
          className="text-gray-600 hover:text-gray-800"
        >
          <FaRedo size={24} />
        </button>
      </div>

      {/* 전체 진행바 */}
      <div className="flex items-center w-full space-x-4">
        <span className="text-sm text-grayscale-90">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          className="flex-grow accent-primary-50"
        />
        <span className="text-sm text-gray-600">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
