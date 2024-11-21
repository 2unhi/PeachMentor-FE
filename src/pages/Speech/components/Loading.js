import React from "react";
import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-5">
      <PacmanLoader color="#1468dd" loading size={25} speedMultiplier={1} />
      <div className="pb-10 text-lg font-bold text-primary-70 font-paperlogy-title">
        <p>분석을 진행하고 있어요</p>
      </div>
    </div>
  );
};

export default Loading;
