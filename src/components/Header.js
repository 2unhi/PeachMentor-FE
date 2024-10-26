import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Header의 복숭아멘토 텍스트 클릭 시 메인 페이지로 이동
  const handleLogoClick = () => {
    navigate("/main");
  };

  // Header의 오른쪽 메뉴 버튼 클릭 시 마이페이지로 이동
  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-primary-50 w-full max-w-[500px] mx-auto">
      <h1
        className="text-3xl font-bold font-paperlogy-heading text-white cursor-pointer"
        onClick={handleLogoClick}
      >
        복숭아멘토
      </h1>
      <img
        src="/webp/mypage_menu.webp"
        alt="My Page Icon"
        className="w-8 h-8 cursor-pointer"
        onClick={handleMyPageClick}
      />
    </header>
  );
};

export default Header;
