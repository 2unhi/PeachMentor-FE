import React from "react";
import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-20 space-y-6">
      <div className="pb-5 text-xl font-bold text-primary-70 font-paperlogy-title">
        <p>분석을 진행하고 있어요</p>
      </div>
      <PacmanLoader color="#1468dd" loading size={25} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
