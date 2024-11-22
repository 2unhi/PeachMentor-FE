import React, { useEffect, useState } from "react";

const LoginProcessingPage = () => {
  const text = "복숭아멘토 서비스 이용을 위해\n로그인 진행 중입니다";
  const [displayText, setDisplayText] = useState(""); // 화면 표시
  const [index, setIndex] = useState(0); // 현재 텍스트

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [index, text]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <h1 className="text-lg font-bold text-grayscale-90 font-paperlogy-title">
        {displayText}
      </h1>
    </div>
  );
};

export default LoginProcessingPage;
