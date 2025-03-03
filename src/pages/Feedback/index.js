import React, {useContext, useEffect, useState} from "react";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import AISpeechPopup from "./components/AISpeechPopup";
import ScriptBox from "./components/ScriptBox";
import SelfFeedbackPopup from "./components/SelfFeedbackPopup";
import instance from "../../axios/TokenInterceptor";
import {SPRING_API_URL} from "../../constants/api";
import {useLocation} from "react-router-dom";
import {NotificationContext} from "../../context/NotificationProvider";

const userImage = "/images/record_user.png";
const aiImage = "/images/record_ai.png";
const feedbackImage = "/images/record_feedback.png";

const Feedback = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const answerId = searchParams.get("answerId");
    const date = searchParams.get("date");
    const formattedDate = new Date(date).toISOString().split("T")[0];

    const [userAudioUrl, setUserAudioUrl] = useState("");
    const [aiAudioUrl, setAiAudioUrl] = useState("");
    const [userScript, setUserScript] = useState("");
    const [aiScript, setAiScript] = useState("");
    const [feedback, setFeedback] = useState("");
    const [aiResponse, setAiResponse] = useState("");

    const [isUserScriptOpen, setIsUserScriptOpen] = useState(false);
    const [isAiScriptOpen, setIsAiScriptOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // AI 답변 팝업 상태
    const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false); // 셀프 피드백 팝업 상태
    const [activeAudio, setActiveAudio] = useState(null);

    const [hasFetchedData, setHasFetchedData] = useState(false);

    const {
        isNewReport,
        setIsNewReport,
    } = useContext(NotificationContext);

    useEffect(() => {
        if (hasFetchedData) return;

        const getFeedbackData = async () => {
            try {
                const response = await instance.get(
                    `${SPRING_API_URL}/feedbacks?answerId=${answerId}`
                );
                if (response.data.isSuccess) {
                    setUserAudioUrl(response.data.result.beforeAudioLink);
                    setAiAudioUrl(response.data.result.afterAudioLink);
                    setUserScript(response.data.result.beforeScript);
                    setAiScript(response.data.result.afterScript);
                    setFeedback(response.data.result.feedbackText);
                    console.log("유저 답변에 대한 피드백 데이터 받아오기 성공");
                } else {
                    console.error("데이터 api 오류");
                }
            } catch (error) {
                console.error("데이터 받아오기 실패");
            }
        };

        const getAiResponse = async () => {
            try {
                const response = await instance.get(
                    `${SPRING_API_URL}/insights?answerId=${answerId}`
                );
                if (response.data.isSuccess) {
                    setAiResponse(response.data.result.insight);
                    console.log("서버에서 인사이트 받아오기 성공");
                } else {
                    console.error("서버에서 인사이트 받아오기 api 오류");
                }
            } catch (error) {
                console.error("서버에서 인사이트 받아오기 실패");
            }
        };

        getAiResponse();
        getFeedbackData();
        setHasFetchedData(true);
    }, [answerId, hasFetchedData]);

    const playAudioWithGauge = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play();
        setActiveAudio(audioUrl);
        audio.onended = () => setActiveAudio(null);
    };

    const handleCloseNotification = () => {
        setIsNewReport(false);
    }

    return (
        <div className="relative flex flex-col w-full min-h-screen overflow-hidden">
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
                            onClick={() => handleCloseNotification()}
                        >
                            확인하러 가기
                        </button>
                    </div>
                </div>
            )}
            <div className="fixed top-0 z-10 w-full">
                <Header/>
            </div>
            <div className="flex-1 w-full max-w-[500px] mx-auto pt-24 pb-24 overflow-y-auto px-4 space-y-6 bg-white">
                <div className="relative flex flex-col items-center space-y-6">
                    <div className="flex mb-4 space-x-8">
                        {/* AI 답변 보기 버튼 */}
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="flex-1 py-4 text-lg font-semibold text-white rounded-full px-7 bg-primary-50 whitespace-nowrap"
                        >
                            AI 답변 보기
                        </button>

                        {/* 셀프 피드백 체크 버튼 */}
                        <button
                            onClick={() => setIsFeedbackPopupOpen(true)}
                            className="flex-1 py-4 text-lg font-semibold text-white rounded-full px-7 bg-primary-50 whitespace-nowrap"
                        >
                            셀프 피드백
                        </button>
                    </div>

                    {/* 상단 메시지 */}
                    <div
                        className="flex items-center justify-center w-full max-w-md px-4 py-2 rounded-md bg-grayscale-10">
                        <p className="text-base text-center font-paperlogy-title font-regular">
                            {formattedDate} 스피치 기록!
                        </p>
                    </div>

                    {/* 사용자 스피치 스크립트 */}
                    <ScriptBox
                        image={userImage}
                        title="나의 스크립트"
                        description="추임새, 침묵시간 등이 포함됩니다."
                        content={userScript}
                        audioUrl={userAudioUrl}
                        isOpen={isUserScriptOpen}
                        toggleOpen={() => setIsUserScriptOpen(!isUserScriptOpen)}
                        playAudioWithGauge={playAudioWithGauge}
                        activeAudio={activeAudio}
                        duration={60}
                    />

                    {/* AI 수정 스크립트 */}
                    <ScriptBox
                        image={aiImage}
                        title="AI가 수정한 스크립트"
                        description="위 스크립트를 AI가 직접 수정했어요."
                        content={aiScript}
                        audioUrl={aiAudioUrl}
                        isOpen={isAiScriptOpen}
                        toggleOpen={() => setIsAiScriptOpen(!isAiScriptOpen)}
                        playAudioWithGauge={playAudioWithGauge}
                        activeAudio={activeAudio}
                        duration={60}
                    />

                    {/* AI 피드백 */}
                    <ScriptBox
                        image={feedbackImage}
                        title="AI 피드백"
                        description="복숭아멘토의 상세한 피드백을 확인하세요!"
                        content={feedback}
                        audioUrl={null}
                        isOpen={isFeedbackOpen}
                        toggleOpen={() => setIsFeedbackOpen(!isFeedbackOpen)}
                    />
                </div>
            </div>

            <div className="fixed bottom-0 z-20 w-full">
                <NavBar/>
            </div>

            {/* AI 답변 팝업 */}
            <AISpeechPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                response={aiResponse}
            />

            {/* 셀프 피드백 팝업 */}
            <SelfFeedbackPopup
                isOpen={isFeedbackPopupOpen}
                onClose={() => setIsFeedbackPopupOpen(false)}
                answerId={answerId}
            />
        </div>
    );
};

export default Feedback;
