import React, {createContext, useState} from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
    const [isNewReport, setIsNewReport] = useState(false);
    const [analysisText, setAnalysisText] = useState("");
    const [firstDate, setFirstDate] = useState("");
    const [lastDate, setLastDate] = useState("");

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