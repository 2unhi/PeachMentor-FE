import React, {useState} from "react";
import {FaStar} from "react-icons/fa";
import instance from "../../../axios/TokenInterceptor";
import {SPRING_API_URL} from "../../../constants/api";

const SelfFeedbackPopup = ({isOpen, onClose}) => {
    const [rating, setRating] = useState(0);

    const sendSelfFeedbackEvaluation = async () => {
        const answerId = localStorage.getItem("answerId");
        try {
            const response = await instance.post(`${SPRING_API_URL}/answers/evaluations?answerId=${answerId}`,
                {evaluation: rating});
            if (response.data.isSuccess) {
                if (response.data.code === "SELFFEEDBACK4001") {

                } else {
                    onClose();
                    console.log("셀프 피드백 평가 점수 저장하기 성공");
                }
            } else {
                console.error("셀프 피드백 평가 점수 저장하기 api 오류");
            }
        } catch (error) {
            console.error("셀프 피드백 평가 점수 저장하기 실패");
        }
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg p-6 w-[320px] text-center space-y-4">
                <img
                    src="/webp/close_button_x.webp"
                    alt="닫기"
                    className="absolute w-6 h-6 cursor-pointer top-2 right-2"
                    onClick={onClose}
                />
                <h2 className="mb-4 text-xl font-bold">셀프 피드백</h2>
                <p className="text-sm">
                    지난번 스피치보다 오늘의 답변은 어느정도
                    <br/> 개선이 되었는지 스스로 평가해주세요!
                </p>

                {/* 별점 평가 */}
                <div className="flex justify-center space-x-2">
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            size={32}
                            onClick={() => handleStarClick(index)}
                            className={index < rating ? "text-yellow-400" : "text-gray-300"}
                            style={{cursor: "pointer"}}
                        />
                    ))}
                </div>

                <button
                    onClick={sendSelfFeedbackEvaluation}
                    className="px-4 py-2 text-white rounded bg-primary-50"
                >
                    전송
                </button>
            </div>
        </div>
    );
};

export default SelfFeedbackPopup;
