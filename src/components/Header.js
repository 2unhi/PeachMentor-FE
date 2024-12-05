import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axios/TokenInterceptor";
import { SPRING_API_URL } from "../constants/api";
import { NotificationContext } from "../context/NotificationProvider";
import ReportPopup from "./ReportPopup";

const Header = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [popupStates, setPopupStates] = useState({});
    const { analysisText, firstDate, lastDate } = useContext(NotificationContext);

    const handleLogoClick = async () => {
        let isCompleteSpeech = false;
        let selfFeedback = null;

        try {
            const response = await instance.get(
                `${SPRING_API_URL}/feedbacks/completions`
            );
            if (response.data.isSuccess) {
                isCompleteSpeech = response.data.result.speechExists;
            }
        } catch (error) {
            console.error("오늘 답변 했는 지 여부 받아오기 실패");
        }

        try {
            const response = await instance.get(
                `${SPRING_API_URL}/self-feedbacks/latest-feedbacks`
            );
            if (response.data.isSuccess) {
                selfFeedback = response.data.result.feedback;
            }
        } catch (error) {
            console.error("이전 셀프 피드백 받아오기 실패");
        }

        navigate(
            `/main?selfFeedback=${selfFeedback}&isCompleteSpeech=${isCompleteSpeech}`
        );
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleMyPageClick = () => {
        navigate("/mypage");
    };

    const togglePopup = (index) => {
        setPopupStates((prevStates) => ({
            ...prevStates,
            [index]: !prevStates[index],
        }));
    };

    return (
        <>
            <header className="flex items-center justify-between p-4 bg-primary-50 w-full max-w-[500px] mx-auto">
                <h1
                    className="text-3xl font-bold text-white cursor-pointer font-paperlogy-heading"
                    onClick={handleLogoClick}
                >
                    복숭아멘토
                </h1>
                <div className="flex items-center gap-3">
                    <img
                        src="/images/notification.svg"
                        alt="Notification Icon"
                        className="cursor-pointer w-7 h-7"
                        onClick={handleOpenModal}
                    />
                    <img
                        src="/webp/mypage_menu.webp"
                        alt="My Page Icon"
                        className="w-8 h-8 cursor-pointer"
                        onClick={handleMyPageClick}
                    />
                </div>
            </header>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-[500px] flex flex-col">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {firstDate && lastDate ? (
                                <>
                                    {`${firstDate}~${lastDate}`}
                                    <br />
                                    분석 리포트
                                </>
                            ) : (
                                "분석 리포트가 아직 없습니다!"
                            )}
                        </h2>
                        {/* 스크롤 가능한 영역 */}
                        <div className="flex-1 overflow-y-auto mb-4">
                            {analysisText.map((row, rowIndex) => (
                                <div key={rowIndex} className="mb-4">
                                    <ReportPopup
                                        title={row[0]}
                                        content={row[1]}
                                        isOpen={!!popupStates[rowIndex]}
                                        toggleOpen={() => togglePopup(rowIndex)}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* 닫기 버튼 */}
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600 transition-colors"
                            onClick={handleCloseModal}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;