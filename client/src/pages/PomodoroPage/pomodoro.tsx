import React, { useState, useEffect } from 'react';
import './pomodoro.css';
import config from './pomodoro-config.json';

import { InitPomodoro, endPomodoro } from '../../api/pomodoroOperations';

const Pomodoro: React.FC = () => {
    const studyMinutes = config.pomodoroTimer.studyTime.minutes;
    const studySeconds = config.pomodoroTimer.studyTime.seconds;

    const breakMinutes = config.pomodoroTimer.breakTime.minutes;
    const breakSeconds = config.pomodoroTimer.breakTime.seconds;

    const [minutes, setMinutes] = useState<number>(25);
    const [seconds, setSeconds] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isBreak, setIsBreak] = useState<boolean>(false);
    const [sessionFlag, setSessionFlag] = useState<boolean>(false);
    const [sessionID, setSessionID] = useState<number>(0);

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
        window.addEventListener('beforeunload', beforeUnload);

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
        startPomodoro();
    };

    const reset = () => {
        setStudyTime();
    };

    const forceBreak = () => {
        setBreakTime();
    }

    async function startPomodoro(): Promise<void> {
        console.log("Session Flag: " + sessionFlag);
        if(!sessionFlag) {
            setSessionFlag(true);
            const id = await InitPomodoro();
            setSessionID(id);
        }
    }

    const beforeUnload = () => {
        return (e: BeforeUnloadEvent) => {
            endPomodoro(sessionID);
        }
    }

    return (
        <div className='timer-container'>
            <h1>{isBreak ? 'Break!' : 'Study!'}</h1>
            <div className='timer-display'>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
            <div className='buttons-container'>
                <button onClick={toggle} className='btn btn-primary'>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={reset} className='btn btn-primary'>
                    Reset
                </button>
                <button onClick={forceBreak} className='btn btn-primary'>
                    Force Break
                </button>
            </div>

        </div>
    );
};

export default Pomodoro;