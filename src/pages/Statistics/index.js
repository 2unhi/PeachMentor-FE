import React, { useState } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { dummyStatisticsData } from "../../constants/statisticsData"; // 더미 데이터

const StatisticsPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = React.useRef(null);

  const handleDragScroll = (event) => {
    const isTouch = event.type === "touchstart" || event.type === "touchmove";
    const clientX = isTouch ? event.touches[0].clientX : event.clientX;

    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollPosition - clientX;
    }
    setScrollPosition(clientX);
  };

  return (
    <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-white">
      <Header />
      <div className="flex flex-col items-center flex-grow p-4">
        <p className="px-4 py-2 my-6 text-base rounded-md text-grayscale-90 font-paperlogy-title bg-grayscale-10">
          최근 기록을 확인하고 나의 말하기 습관을 분석해보세요.
        </p>

        {/* 그래프 영역 */}
        <div
          className="w-full max-w-[450px] overflow-x-auto scrollbar-hide relative"
          ref={scrollRef}
          onMouseDown={(e) => setScrollPosition(e.clientX)}
          onMouseMove={(e) => e.buttons === 1 && handleDragScroll(e)}
          onMouseUp={() => setScrollPosition(0)}
          onTouchStart={(e) => setScrollPosition(e.touches[0].clientX)}
          onTouchMove={handleDragScroll}
          onTouchEnd={() => setScrollPosition(0)}
        >
          <div className="w-[1500px] h-[300px] flex items-center">
            {" "}
            <ResponsiveContainer width="90%" height={300}>
              <LineChart
                data={dummyStatisticsData} // 더미 데이터 사용
                margin={{ top: 20, right: 20, left: 10, bottom: 0 }}
              >
                <Line type="monotone" dataKey="간투어" stroke="#005FAD" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(day) => day.substring(5)}
                />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <NavBar />
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>
    </div>
  );
};

export default StatisticsPage;
