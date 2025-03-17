import axios from "axios";
import axiosInstance from "./axiosInstance";

export interface PomodoroObject {
    id: number;
    startTime: number;
    endTime: number;
    duration: number
}

axios.defaults.withCredentials = true;

export async function InitPomodoro(pomodoroObject: PomodoroObject): Promise<number> {
    try {

        const response = await axiosInstance.post('http://localhost:8080/pomodoro', {pomodoroObject:{
            id: pomodoroObject.id,
            startTime: pomodoroObject.startTime,
            endTime: pomodoroObject.endTime,
            duration:pomodoroObject.duration,
            userId: 0
        }});
        console.log(response); 

        if (response != undefined) {
         
            return response.data.id
        } else {
            throw new Error('Failed to fetch pomodoros');
        }
    } catch (error) {
        console.error('Error in InitPomodoro:', error);
        throw error;
    }
   
}

export async function getPomodoros(): Promise<PomodoroObject[]> {
    try {
        const response = await axiosInstance.get('http://localhost:8080/pomodoro');
        if (response != undefined) {
            return response.data;
        } else {
            throw new Error('Failed to fetch pomodoros');
        }
    } catch (error) {
        console.error('Error in getPomodoros:', error);
        throw error;
    }
}

export async function deletePomodoro(id: number) {
    const response = await axios.delete('http://localhost:8080/pomodoro/', { data: { id: id } });
    return response.data;
}