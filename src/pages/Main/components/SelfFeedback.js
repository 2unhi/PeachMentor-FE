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
    <div className="w-[80%] p-6 bg-grayscale-00 border-2 rounded-lg border-grayscale-10">
      <div className="p-4 text-lg font-medium text-center font-paperlogy-title text-grayscale-100">
        {formatContent(selfFeedback)}
      </div>
    </div>
  );
};

export default SelfFeedback;
