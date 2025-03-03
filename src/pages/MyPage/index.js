import React from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";

const MyPage = () => {
  return (
    <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-[#fcfcfc]">
      <Header />
      {/* 이후 마이 페이지 컨텐츠 수정 예정 */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold text-primary-900">마이 페이지</h1>
      </main>
      <NavBar />
    </div>
  );
};

export default MyPage;
