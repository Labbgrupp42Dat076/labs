import React, { useState, useEffect } from 'react';
import './pomodoro.css';
import config from './pomodoro-config.json';

const Pomodoro: React.FC = () => {
    const studyMinutes = config.pomodoroTimer.studyTime.minutes;
    const studySeconds = config.pomodoroTimer.studyTime.seconds;

    const breakMinutes = config.pomodoroTimer.breakTime.minutes;
    const breakSeconds = config.pomodoroTimer.breakTime.seconds;

    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(10);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isBreak, setIsBreak] = useState<boolean>(false);


    const setStudyTime = () => {
        setMinutes(studyMinutes);
        setSeconds(studySeconds);
        setIsActive(false);
        setIsBreak(false);
    }

    const setBreakTime = () => {
        setMinutes(breakMinutes);
        setSeconds(breakSeconds);
        setIsActive(false);
        setIsBreak(true);
    }

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0 && !isBreak) {
                        clearInterval(interval!);
                        setBreakTime();
                    } else if (minutes === 0 && isBreak) {
                        clearInterval(interval!);
                        setStudyTime();

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
        setStudyTime();
    };

    const forceBreak = () => {
        setBreakTime();
    }

    

    return (
        <div className='body'>
        <div className='timer-container'>
            <h1>{isBreak ? 'Break!' : 'Study!'}</h1>
            <div className='timer-display'>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <button onClick={toggle} className='button'>
                {isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={reset} className='button'>
                Reset
            </button>
            <button onClick={forceBreak} className='button'>
                Force Break
            </button>
        </div>
        </div>
    );
};

export default Pomodoro;