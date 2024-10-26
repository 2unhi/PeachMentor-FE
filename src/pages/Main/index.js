import React from "react";
import instance from "../../axios/TokenInterceptor";
import Record from "../../components/Record";
import Header from "../../components/Header";
import { SPRING_API_URL } from "../../constants/api";

const Main = () => {
  const testButton = async () => {
    try {
      await instance.post(`${SPRING_API_URL}/test`);
    } catch (error) {
      console.log("TEST!");
    }
  };

  return (
    <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-[#fcfcfc]">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <img src="/images/whale.png" alt="Whale" className="w-24 h-24 mb-4" />
        <h1 className="text-xl font-bold text-primary-900">메인 페이지</h1>
        <button
          onClick={testButton}
          className="mt-4 px-4 py-2 bg-primary-700 rounded"
        >
          테스트용 버튼
        </button>
        <Record />
      </main>
    </div>
  );
};

export default Main;
