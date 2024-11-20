import React from "react";

const SelfFeedback = ({ selfFeedback }) => {
  console.log(selfFeedback);

  const formatContent = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="p-6 bg-white border-2 rounded-lg shadow-md border-primary-40">
      <div className="p-4 text-lg font-medium text-center font-paperlogy-title text-grayscale-100">
        {formatContent(selfFeedback)}
      </div>
    </div>
  );
};

export default SelfFeedback;
