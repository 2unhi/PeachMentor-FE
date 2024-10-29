import React from "react";

const Question = ({ questionText }) => {
  return (
    <div className="p-4 text-lg font-semibold text-center whitespace-pre-line font-paperlogy-title text-grayscale-100">
      {questionText}
    </div>
  );
};

export default Question;
