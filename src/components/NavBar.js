import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  // 하단 바 버튼 경로, 이미지, 텍스트를 저장하는 배열
  const menuItems = [
    { path: "/calendar", icon: "/webp/calendar_button.webp", label: "캘린더" },
    { path: "/main", icon: "/webp/home_button.webp", label: "홈" },
    {
      path: "/statistics",
      icon: "/webp/statistics_button.webp",
      label: "통계",
    },
  ];

  return (
    <nav className="bottom-0 left-0 w-full max-w-[500px] mx-auto flex justify-around border-t border-slate-500 py-3">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.path)}
          className="flex flex-col items-center"
        >
          <img
            src={item.icon}
            alt={`${item.label} Icon`}
            className="w-6 h-6 mb-1"
          />
          <span className="text-base font-paperlogy-title">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavBar;
