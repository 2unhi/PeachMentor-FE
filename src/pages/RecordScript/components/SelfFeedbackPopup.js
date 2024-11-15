import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const SelfFeedbackPopup = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[320px] text-center space-y-4">
        <h2 className="mb-4 text-xl font-bold">셀프 피드백 체크</h2>
        <p className="text-sm">
          지난번에 작성했던 셀프 피드백에 대해 어느정도
          <br /> 개선이 되었는지 스스로 체크해주세요!
        </p>
        <div className="flex justify-center space-x-2">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={32}
              onClick={() => handleStarClick(index)}
              className={index < rating ? "text-yellow-400" : "text-gray-300"}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 text-white rounded bg-primary-50"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default SelfFeedbackPopup;
