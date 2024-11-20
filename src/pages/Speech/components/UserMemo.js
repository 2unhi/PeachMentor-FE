import React, {useState} from "react";
import instance from "../../../axios/TokenInterceptor";
import {SPRING_API_URL} from "../../../constants/api";

const UserMemo = () => {
    const [memo, setMemo] = useState("");
    const [showPopup, setShowPopup] = useState(false); // 팝업 상태 추가

    const handleSubmit = async () => {
        try {
            const answerId = localStorage.getItem("answerId");
            if (!answerId) {
                console.error("answerId가 null입니다. 저장을 진행할 수 없습니다.");
                alert("answerId가 설정되지 않았습니다. 다시 시도해주세요.");
                return; // answerId가 없으면 요청 차단
            }

            const response = await instance.post(
                `${SPRING_API_URL}/self-feedbacks?answerId=${answerId}`,
                {feedback: memo}
            );

            if (response.data.isSuccess) {
                console.log("셀프 피드백 제출 성공");
                setShowPopup(true); // 팝업 표시
            } else {
                console.error("셀프 피드백 제출 오류");
                console.log(response.data.code);
                console.log(response.data.message);
            }
        } catch (error) {
            console.error("셀프 피드백 제출 실패:", error);
        }
    };

    return (
        <div className="w-full p-3 mt-6 rounded-lg shadow bg-primary-00">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold">나만의 메모장</h3>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-1 text-sm font-semibold text-black rounded bg-primary-30 hover:bg-primary-40"
                >
                    저장
                </button>
            </div>
            <textarea
                className="w-full h-24 p-2 text-sm border rounded resize-none border-grayscale-40"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="상단 오디오 버튼을 통해 녹음 내용을 다시 들어보며 스스로 평가해보세요!"
            />
            {/* 저장 시 나오는 팝업 */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative max-w-sm p-6 bg-white rounded-lg shadow-lg">
                        <img
                            src="/webp/close_button_x.webp"
                            alt="닫기"
                            className="absolute w-6 h-6 cursor-pointer top-2 right-2"
                            onClick={() => setShowPopup(false)}
                        />
                        <p className="text-lg font-bold text-center font-paperlogy-title text-primary-50">
                            셀프 피드백 저장이 완료되었습니다!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMemo;
