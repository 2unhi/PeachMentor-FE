import React from "react";
import Header from "../../components/Header";

const MyPage = () => {
  return (
    <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-[#fcfcfc]">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold text-primary-900">마이 페이지</h1>
      </main>
    </div>
  );
};

export default MyPage;
