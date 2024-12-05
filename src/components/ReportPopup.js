import React from "react";

const ReportPopup = ({
                         title,
                         content,
                         isOpen,
                         toggleOpen,
                     }) => {
    return (
        <div
            className="relative flex flex-col w-full p-4 transition-all bg-white border rounded-lg shadow cursor-pointer border-grayscale-40 hover:shadow-md"
            onClick={toggleOpen}
        >
            {title}
            {/* 드롭다운 텍스트 */}
            {isOpen && (
                <div className="mt-3 text-sm text-justify transition-all duration-300 ease-in-out text-grayscale-90">
                    {content}
                </div>
            )}
        </div>
    );
};

export default ReportPopup;
