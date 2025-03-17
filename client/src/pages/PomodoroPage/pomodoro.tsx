import React, { useState, useEffect } from 'react';
import './pomodoro.css';
import config from './pomodoro-config.json';

import { InitPomodoro, getPomodoros, PomodoroObject } from '../../api/pomodoroOperations';

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
    const[ponmodoroSessions, setPomodoroSessions] = useState<PomodoroObject[]>([]);
    const [pomodoroObject, setPomodoroObject] = useState({
        id: 0,
        startTime: 0,
        endTime: 0,
        duration: 0
    });

    const setStudyTime = () => {
        setMinutes(studyMinutes);
        setSeconds(studySeconds);
        setIsActive(false);
        setIsBreak(false);
        alert("Study Time!");
    }

    const setBreakTime = () => {
        setMinutes(breakMinutes);
        setSeconds(breakSeconds);
        setIsActive(false);
        setIsBreak(true);
        alert("Break Time!");
    }

    useEffect(() => {
        fetchPomodoros();
    }, []);
    
    async function fetchPomodoros() {
        const pomodoros = await getPomodoros();
        setPomodoroSessions(pomodoros);
    }

    useEffect(() => {
        window.addEventListener('pageswap', () => { beforeUnload() });
        window.addEventListener('beforeunload', () => { beforeUnload() });

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
        if (!sessionFlag) {
            setSessionFlag(true);
            setPomodoroObject({id:Math.floor(Date.now() / 1000), startTime:Math.floor(Date.now() / 1000), endTime:0, duration:0});
        }
    }

    async function beforeUnload() {
        pomodoroObject.endTime = Math.floor(Date.now() / 1000);
        pomodoroObject.duration = (pomodoroObject.endTime - pomodoroObject.startTime);
        setPomodoroObject(pomodoroObject);

        if (sessionFlag) {            
            await InitPomodoro(pomodoroObject);
            setSessionFlag(false);
            window.removeEventListener('pageswap', () => { beforeUnload() });
            window.removeEventListener('beforeunload', () => { beforeUnload() });
        }
    }

    return (
        <div className='page-container'>
            <div className='main-container'>
                <div className='element-container' id='timer-container'>
                    <h1>{isBreak ? 'Break!' : 'Study!'}</h1>
                    <div className='timer-display'>
                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </div>
                    <div className='buttons-container'>
                        <button onClick={toggle} className='start-button'>
                            {isActive ? 'Pause' : 'Start'}
                        </button>
                        <p>
                            <button onClick={reset} className='button'>
                                Reset
                            </button>
                            <button onClick={forceBreak} className='button'>
                                Force Break
                            </button>
                        </p>
                    </div>
                </div>

                <div className='element-container' id='pomodoro-sessions-container'>
                    <h5>Previous pomodorosessions</h5>
                    <hr />
                    {ponmodoroSessions.map((pomodoro, index) => {
                        return (
                            <div key={index}>
                                <p className='bold'>Day: {translateSecondsfromEpochToTheDayAndTimeItIsToday(pomodoro.startTime)}</p>
                                <p>Duration: {translateSecondsFromEpochToHoursMinutesSeconds(pomodoro.duration)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Pomodoro;

function translateSecondsfromEpochToTheDayAndTimeItIsToday(seconds: number): string {
    const date = new Date(seconds * 1000);
    return date.toLocaleString();
}

function translateSecondsFromEpochToHoursMinutesSeconds(seconds: number): string {
    seconds = Math.floor(seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    if (minutes === 0) {
        return `${secondsLeft} seconds`;
    }
    if (hours === 0) {
        return `${minutes} minutes, ${secondsLeft} seconds`;
    }
    else{
    return `${hours} hours, ${minutes} minutes, ${secondsLeft} seconds`;
    }
}