import React from "react";
import axios from "axios";
import LottieAnimation from "./LottieAnimation";
import { SPRING_API_URL } from "../constants/api";

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
    <div className="mx-auto flex h-screen w-[450px] flex-col items-center justify-center bg-primary-50">
      <div className="p-4 text-center">
        <h1 className="mb-8 font-paperlogy-heading text-[40px] text-white">
          복숭아멘토
        </h1>
        <div className="mb-8">
          <LottieAnimation />
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/images/kakao_login.svg"
            alt="Kakao Login"
            className="w-[320px] h-[60px] cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleKakaoLoginClick}
          />
          <img
            src="/images/naver_login.svg"
            alt="Naver Login"
            className="w-[320px] h-[60px] cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleNaverLoginClick}
          />
          <img
            src="/images/google_login.svg"
            alt="Google Login"
            className="w-[320px] h-[60px] cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleGoogleLoginClick}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
