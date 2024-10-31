import React from "react";

const AISpeechPopup = ({ isOpen, onClose, response }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-5/6 max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">AI 답변</h2>
        <p>{response}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 mt-4 text-white rounded bg-primary-50 hover:bg-primary-60"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AISpeechPopup;