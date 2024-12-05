import React from "react";

const StartPopup = ({ level, selfFeedback, onClose, onStart }) => {
  const getQuestionMessage = () => {
    switch (level) {
      case 1:
        return "시작 버튼 클릭 후 20초 뒤 스피치가 시작됩니다!";
      case 2:
        return "시작 버튼 클릭 후 10초 뒤 스피치가 시작됩니다!";
      case 3:
        return "시작 버튼 클릭 후 5초 뒤 스피치가 시작됩니다!";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[85%] max-w-[400px] bg-white rounded-lg shadow-lg p-4">
        <h2 className="mb-4 text-lg font-bold text-center text-grayscale-100">
          🖐🏻 잠깐 🖐🏻 <br /> 과거의 나는 어떤 피드백을 남겼을까?
        </h2>
        {/* 셀프 피드백 내용 */}
        <div>
          <div className="p-4 text-lg font-medium text-center text-grayscale-100 scrollbar-hide">
            {selfFeedback}
          </div>
        </div>
        <p className="py-4 text-center font-paperlogy-title">
          {getQuestionMessage()}
        </p>
        {/* 버튼 */}
        <div className="flex justify-between font-paperlogy-title">
          <button
            className="px-4 py-2 text-black rounded-xl bg-grayscale-20 hover:bg-grayscale-30"
            onClick={onClose}
          >
            이전
          </button>
          <button
            className="px-4 py-2 text-white rounded-xl bg-primary-40 hover:bg-primary-50"
            onClick={onStart}
          >
            시작
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPopup;
