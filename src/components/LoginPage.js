import React from "react";
import axios from "axios";
import Record from "./Record";
import { SPRING_API_URL } from "../constants";

axios.defaults.withCredentials = true;

const LoginPage = (message) => {
  // OAuth2 로그인
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
    <div className="flex flex-col justify-center items-center h-screen text-center p-4">
      <h2 className="mb-8 text-2xl font-bold">복숭아 멘토~</h2>
      <div className="flex flex-col items-center">
        <img
          src="/images/kakao_login.svg"
          alt="Kakao Login"
          className="w-48 mb-4 cursor-pointer"
          onClick={handleKakaoLoginClick}
        />
        <img
          src="/images/naver_login.svg"
          alt="Naver Login"
          className="w-48 mb-4 cursor-pointer"
          onClick={handleNaverLoginClick}
        />
        <img
          src="/images/google_login.svg"
          alt="Google Login"
          className="w-48 mb-4 cursor-pointer"
          onClick={handleGoogleLoginClick}
        />
        <Record /> {/* Record 컴포넌트 추가 */}
      </div>
    </div>
  );
};

export default LoginPage;
