import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dummyStatisticsData } from "../../constants/statisticsData";

const StatisticsPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = React.useRef(null);

  // 페이지 렌더링 후 가장 최근 데이터가 보이도록 스크롤 조정
  useEffect(() => {
    if (scrollRef.current) {
      // 오른쪽 끝으로 스크롤 이동
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []); // 빈 의존성 배열로 한 번만 실행

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
        <p className="mb-6 text-sm text-grayscale-90 font-paperlogy-title">
          좌우로 스크롤 하면 이전 기록을 한 번에 확인할 수 있어요
        </p>

        {/* 그래프 영역 */}
        <div
          className="w-full max-w-[400px] overflow-x-auto scrollbar-hide relative flex border rounded-3xl px-2"
          ref={scrollRef}
          onMouseDown={(e) => setScrollPosition(e.clientX)}
          onMouseMove={(e) => e.buttons === 1 && handleDragScroll(e)}
          onMouseUp={() => setScrollPosition(0)}
          onTouchStart={(e) => setScrollPosition(e.touches[0].clientX)}
          onTouchMove={handleDragScroll}
          onTouchEnd={() => setScrollPosition(0)}
        >
          {/* Y축 */}
          <div className="w-[50px] h-[320px] sticky left-0 z-10 bg-white">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dummyStatisticsData}>
                <YAxis
                  width={50}
                  tick={{ fontSize: 12, fill: "#333" }}
                  axisLine={false}
                  tickLine={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 그래프 */}
          <div className="flex-grow h-full">
            <ResponsiveContainer width={1500} height={300}>
              <LineChart
                data={dummyStatisticsData}
                margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
              >
                {/* 그래프 선 */}
                <Line
                  type="monotone"
                  dataKey="간투어"
                  stroke="#5D9CEC"
                  strokeWidth={3}
                  dot={{ fill: "#5D9CEC", r: 3 }}
                  activeDot={{ fill: "#34495E", r: 7 }}
                />
                {/* X축 */}
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "#333" }}
                  tickFormatter={(day) => day.substring(5)}
                  axisLine={{ stroke: "#ccc" }}
                  tickLine={false}
                  interval={0}
                  padding={{ left: 10, right: 10 }}
                />
                {/* 커스텀 Tooltip */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#D6EDFF",
                    borderRadius: "8px",
                    color: "#000000",
                    fontSize: "14px",
                  }}
                  labelFormatter={(label) =>
                    `날짜: ${label.substring(5).replace("-", "/")}`
                  }
                  itemStyle={{ color: "#00325C" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <NavBar />
      {/* 그래프 좌우 스크롤바 숨김 처리 */}
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
