import React from "react";
import Lottie from "react-lottie";
import animationData from "../animations/Lottie-main.json";

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={280} width={280} />;
};

export default LottieAnimation;
