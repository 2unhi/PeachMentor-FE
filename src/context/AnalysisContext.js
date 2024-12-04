import React, { createContext, useState, useContext } from "react";

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
    const [isNewAnalysisText, setIsNewAnalysisText] = useState(false);

    return (
        <AnalysisContext.Provider value={{ isNewAnalysisText, setIsNewAnalysisText }}>
            {children}
        </AnalysisContext.Provider>
    );
};

export const useAnalysis = () => {
    const context = useContext(AnalysisContext);
    if (!context) {
        throw new Error("useAnalysis must be used within an AnalysisProvider");
    }
    return context;
};