import React, { useState, useEffect } from 'react';

const Pomodoro: React.FC = () => {
    const [minutes, setMinutes] = useState<number>(25);
    const [seconds, setSeconds] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval!);
                        setIsActive(false);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isActive, seconds, minutes]);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setMinutes(25);
        setSeconds(0);
        setIsActive(false);
    };

    return (
        <div>
            <div>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <button onClick={toggle}>
                {isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={reset}>
                Reset
            </button>
        </div>
    );
};

export default Pomodoro;