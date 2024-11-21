import React from "react";

const SelfFeedback = ({ selfFeedback }) => {
  const formatContent = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="w-[80%] p-6 bg-grayscale-05 border-2 rounded-lg border-grayscale-10">
      <div className="mb-2 text-xl font-bold text-center font-paperlogy-title text-grayscale-100">
        셀프 피드백이 도착했어요
      </div>
      <div className="p-4 text-lg font-medium text-center font-paperlogy-title text-grayscale-190">
        {formatContent(selfFeedback)}
      </div>
    </div>
  );
};

export default SelfFeedback;
