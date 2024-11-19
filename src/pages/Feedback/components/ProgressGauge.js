import React, { useState, useEffect } from "react";

const ProgressGauge = ({ duration }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 100 / duration, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="w-24 h-1 ml-3 bg-gray-300 rounded-full">
      <div
        style={{ width: `${progress}%` }}
        className="h-full duration-1000 ease-linear rounded-full bg-primary-50 transition-width"
      />
    </div>
  );
};

export default ProgressGauge;
