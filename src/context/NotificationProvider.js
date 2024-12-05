import React, {createContext, useEffect, useState} from "react";
import {SPRING_API_URL} from "../constants/api";
import instance from "../axios/TokenInterceptor";

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
    const [isNewReport, setIsNewReport] = useState(true);
    const [analysisText, setAnalysisText] = useState([["간투어 사용 빈도와 유형","사용자는 \"음\", \"어\", \"그\", \"이제\", \"뭐\" 등의 간투어를 자주 사용합니다. 이 간투어들은 주로 문장을 시작할 때 또는 새로운 아이디어로 넘어갈 때 사용되며, 생각을 정리하는 데 시간을 벌기 위한 것으로 보입니다."],["자주 사용하는 단어나 표현","사용자는 \"생각합니다\", \"것 같습니다\", \"그래서\", \"왜냐면\" 등의 표현을 자주 사용합니다. 이러한 표현들은 사용자가 자신의 의견을 설명하거나 이유를 제시할 때 사용되며, 논리적인 설명을 돕는 역할을 합니다."],["침묵시간의 위치와 경향성","사용자는 주로 중요한 포인트를 말한 후 또는 새로운 아이디어로 전환하기 전에 침묵을 가집니다. 이 침묵은 대체로 1.5초에서 3.0초 사이로 나타나며, 이는 사용자가 다음 말을 생각하거나 이전 말을 소화하는 시간으로 보입니다."],["말을 이어가는 방식","사용자는 접속사 \"그래서\", \"왜냐면\"을 자주 사용하며, 반복적으로 같은 단어를 사용하는 경향이 있습니다. 이는 말을 이어가는 데 도움을 주지만 때로는 불필요한 반복으로 들릴 수 있습니다."],["사용된 문장의 복잡도","사용자는 주로 간단하고 직설적인 문장을 사용합니다. 복잡한 문장보다는 일상적인 언어와 짧은 문장을 선호하는 경향이 있으며, 이는 청자가 이해하기 쉽도록 돕습니다."],["언어적 흐름","사용자의 언어적 흐름은 대체로 자연스럽지만, 간투어의 사용과 일부 반복적인 표현 사용으로 인해 때때로 어색함이 느껴집니다. 또한, 문맥상의 연결이 약간 끊기는 경우가 있어 이 부분에서 개선이 필요합니다."],["질문에 대한 깊이","사용자는 질문에 대해 깊이 있는 답변을 제시하려 노력합니다. 그러나 간혹 질문의 본질에서 벗어나거나 너무 일반적인 답변을 할 때가 있습니다. 예를 들어, 성공에 대한 정의를 설명할 때 구체적인 예시가 더 필요할 수 있습니다."]]);
    const [firstDate, setFirstDate] = useState("2024-11-28");
    const [lastDate, setLastDate] = useState("2024-12-05");

    useEffect(() => {
        const getAnalysisReport = async () => {
            try {
                const response = await instance.get(`${SPRING_API_URL}/analysis`);
                if (response.data.isSuccess) {
                    if (response.data.code === "STATISTICS2003") {
                        setAnalysisText(response.data.result.analysisText);
                        setFirstDate(response.data.result.firstDate);
                        setLastDate(response.data.result.lastDate);
                        console.log("유저 7일 분석 레포트 받아오기 완료");
                    } else {
                        console.error("유저 7일 분석 레포트 받아오기 api 오류");
                    }
                } else {
                    console.error("서버 에러");
                }
            } catch (error) {
                console.error("유저 7일 분석 레포트 받아오기 실패");
            }
        };

        getAnalysisReport();
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                isNewReport,
                setIsNewReport,
                analysisText,
                setAnalysisText,
                firstDate,
                setFirstDate,
                lastDate,
                setLastDate,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};