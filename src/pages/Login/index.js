import React from "react";
import axios from "axios";
import LottieAnimation from "../../components/animations/LottieAnimation";
import { SPRING_API_URL } from "../../constants/api";


axios.defaults.withCredentials = true;

const LoginPage = () => {
  // OAuth2 소셜 로그인
  const handleKakaoLoginClick = () => {
    window.location.href = `${SPRING_API_URL}/oauth/kakao`;
  };

  const handleNaverLoginClick = () => {
    window.location.href = `${SPRING_API_URL}/oauth/naver`;
  };

  const handleGoogleLoginClick = () => {
    window.location.href = `${SPRING_API_URL}/oauth/google`;
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-[500px] flex-col items-center justify-center px-6 bg-primary-50 shadow-lg">
      <h1 className="mb-8 font-paperlogy-heading text-5xl text-white">
        복숭아멘토
      </h1>
      <div className="mb-12">
        <LottieAnimation />
      </div>
      <div className="flex flex-col items-center">
        <img
          src="/images/kakao_login.svg"
          alt="Kakao Login"
          className="w-full max-w-[360px] h-[60px] cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleKakaoLoginClick}
        />
        <img
          src="/images/naver_login.svg"
          alt="Naver Login"
          className="w-full max-w-[360px] h-[60px] cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleNaverLoginClick}
        />
        <img
          src="/images/google_login.svg"
          alt="Google Login"
          className="w-full max-w-[360px] h-[60px] cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleGoogleLoginClick}
        />
      </div>
    </div>
  );
};

export default LoginPage;
