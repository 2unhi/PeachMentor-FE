import React, {createContext, useEffect, useState} from "react";
import {SPRING_API_URL} from "../constants/api";
import instance from "../axios/TokenInterceptor";

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
    const [isNewReport, setIsNewReport] = useState(false);
    const [analysisText, setAnalysisText] = useState([[]]);
    const [firstDate, setFirstDate] = useState("");
    const [lastDate, setLastDate] = useState("");

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
    }, [analysisText]);

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