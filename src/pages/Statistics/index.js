import React, {useContext, useState} from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import instance from "../../axios/TokenInterceptor";
import {SPRING_API_URL} from "../../constants/api";
import {NotificationContext} from "../../context/NotificationProvider";

const StatisticsPage = () => {
    const [activeKey, setActiveKey] = useState("");
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollRef = React.useRef(null);
    const [statisticsData, setStatisticsData] = useState([]);
    const [level, setLevel] = useState(5);

    const {isNewReport, setIsNewReport} = useContext(NotificationContext);

    const handleDragScroll = (event) => {
        const isTouch = event.type === "touchstart" || event.type === "touchmove";
        const clientX = isTouch ? event.touches[0].clientX : event.clientX;

        if (scrollRef.current) {
            scrollRef.current.scrollLeft += scrollPosition - clientX;
        }
        setScrollPosition(clientX);
    };

    const buttonStyle = (buttonLevel) => {
        return level === buttonLevel
            ? "w-12 h-12 flex items-center justify-center text-white rounded-full bg-primary-40 font-paperlogy-title"
            : "w-12 h-12 flex items-center justify-center text-grayscale-90 rounded-full bg-grayscale-20 font-paperlogy-title";
    };

    const handleWholeButton = async () => {
        try {
            const response = await instance.get(`${SPRING_API_URL}/statistics`);
            if (response.data.isSuccess) {
                if (response.data.code === "STATISTICS2001") {
                    setStatisticsData(
                        response.data.result.map((item) => ({
                            day: item.day, // 날짜 그대로 사용
                            추임새: item.gantourCount, // 'gantourCount' 값을 '추임새'로 변환
                            침묵시간: item.silentTime, // 'silentTime' 값을 '침묵시간'으로 변환
                        }))
                    );
                    console.log("통계 데이터 받아오기 성공");
                } else if (response.data.code === "STATISTICS4001") {
                    console.error("통계 데이터 받아오기 실패");
                }
            }
        } catch (error) {
            console.error("통계 데이터 받아오기 실패");
        }
    };

    const handleLevelButton = async (level) => {
        try {
            const response = await instance.get(
                `${SPRING_API_URL}/statistics/levels?level=${level}`
            );
            if (response.data.isSuccess) {
                if (response.data.code === "STATISTICS2001") {
                    setStatisticsData(
                        response.data.result.map((item) => ({
                            day: item.day, // 날짜 그대로 사용
                            추임새: item.gantourCount, // 'gantourCount' 값을 '추임새'로 변환
                            침묵시간: item.silentTime, // 'silentTime' 값을 '침묵시간'으로 변환
                        }))
                    );
                } else if (response.data.code === "STATISTICS4001") {
                    console.error("난이도별 통계 데이터 받아오기 실패");
                }
                console.log("난이도별 통계 데이터 받아오기 성공");
            } else {
                console.error("난이도별 통계 데이터 받아오기 오류");
                console.log(response.data.code);
                console.log(response.data.message);
            }
        } catch (error) {
            console.error("난이도별 통계 데이터 받아오기 오류");
        }
    };

    const handleCloseNotification = () => {
        setIsNewReport(false);
    };

    return (
        <div className="w-full h-full max-w-[500px] mx-auto flex flex-col bg-white">
            {isNewReport && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="relative flex flex-col items-center text-xl font-semibold text-center text-white font-paperlogy-heading">
                        <div className="mt-6 mb-6 animate-floating">
                            <p>
                                잠깐! <br/>
                                새로운 분석 리포트가 도착했습니다! <br/>
                                상단의 종 아이콘을 눌러 확인해주세요!
                            </p>
                        </div>
                        <button
                            className="px-8 py-4 mt-4 text-lg font-semibold text-black rounded-full bg-primary-20"
                            onClick={handleCloseNotification}
                        >
                            확인하러 가기
                        </button>
                    </div>
                </div>
            )}

            <Header/>
            <div className="flex flex-col items-center flex-grow p-4">
                <p className="px-4 py-2 my-4 text-base rounded-md text-grayscale-90 font-paperlogy-title bg-grayscale-10">
                    최근 기록을 확인하고 나의 말하기 습관을 분석해보세요.
                </p>
                <p className="mb-4 text-sm text-grayscale-90 font-paperlogy-title">
                    좌우로 스크롤 하면 이전 기록을 한 번에 확인할 수 있어요
                </p>
                <div className="relative flex w-full">
                    <div className="flex flex-col items-center justify-center mr-4 space-y-4">
                        {[1, 2, 3].map((level) => (
                            <button
                                key={level}
                                onClick={() => {
                                    setLevel(level);
                                    handleLevelButton(level);
                                }}
                                className={buttonStyle(level)}
                            >
                                {level}
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                setLevel(4);
                                handleWholeButton();
                            }}
                            className={buttonStyle(4)}
                        >
                            전체
                        </button>
                    </div>

                    <div
                        className="relative flex-grow overflow-x-auto border scrollbar-hide rounded-3xl"
                        ref={scrollRef}
                        onMouseDown={(e) => setScrollPosition(e.clientX)}
                        onMouseMove={(e) => e.buttons === 1 && handleDragScroll(e)}
                        onMouseUp={() => setScrollPosition(0)}
                        onTouchStart={(e) => setScrollPosition(e.touches[0].clientX)}
                        onTouchMove={handleDragScroll}
                        onTouchEnd={() => setScrollPosition(0)}
                    >
                        <div className="min-w-[800px] pr-4">
                            {/* 그래프 */}
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart
                                    data={statisticsData}
                                    margin={{top: 25, right: 10, left: 0, bottom: 5}}
                                >
                                    <YAxis
                                        dataKey={activeKey}
                                        width={50}
                                        tick={{fontSize: 14, fill: "#333"}}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <XAxis
                                        dataKey="day"
                                        tick={{fontSize: 14, fill: "#333"}}
                                        tickFormatter={(day) => day.substring(5)}
                                        axisLine={{stroke: "#ccc"}}
                                        tickLine={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey={activeKey}
                                        stroke="#5D9CEC"
                                        strokeWidth={3}
                                        dot={{fill: "#5D9CEC", r: 4}}
                                        activeDot={{fill: "#34495E", r: 6}}
                                    />
                                    <Tooltip
                                        cursor={false}
                                        contentStyle={{
                                            backgroundColor: "#D6EDFF",
                                            borderRadius: "8px",
                                            color: "#000000",
                                            fontSize: "16px",
                                        }}
                                        labelFormatter={(label) =>
                                            `날짜: ${label.substring(5).replace("-", "/")}`
                                        }
                                        itemStyle={{color: "#00325C"}}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* 분석 종류 버튼 */}
                <div className="flex justify-center mt-6 space-x-6">
                    <button
                        onClick={() => setActiveKey("추임새")}
                        className={`px-6 py-3 text-lg font-semibold rounded-full ${
                            activeKey === "추임새"
                                ? "bg-primary-50 text-white"
                                : "bg-grayscale-20 text-gray-700"
                        }`}
                    >
                        추임새
                    </button>
                    <button
                        onClick={() => setActiveKey("침묵시간")}
                        className={`px-6 py-3 text-lg font-semibold rounded-full ${
                            activeKey === "침묵시간"
                                ? "bg-primary-50 text-white"
                                : "bg-grayscale-20 text-gray-700"
                        }`}
                    >
                        침묵시간
                    </button>
                </div>
            </div>
            <NavBar/>

            {/* 그래프 좌우 스크롤바 숨김 처리 */}
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default StatisticsPage;

