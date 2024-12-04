import React, {useEffect, useState} from "react";

const Countdown = ({level, onCountdownComplete}) => {
    let initialTime;
    if (level === "1") {
        initialTime = 20;
    } else if (level === "2") {
        initialTime = 10;
    } else if (level === "3") {
        initialTime = 5;
    }
    const [secondsLeft, setSecondsLeft] = useState(initialTime);

    useEffect(() => {
        if (secondsLeft === 0) {
            onCountdownComplete();
            return;
        }

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft, onCountdownComplete]);

    return (
        <div className="mt-10 text-xl font-bold text-primary-50 font-paperlogy-title">
            {secondsLeft}초 후 시작합니다!
        </div>
    );
};

export default Countdown;
