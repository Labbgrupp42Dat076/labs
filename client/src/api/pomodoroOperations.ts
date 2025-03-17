import axios from "axios";
import axiosInstance from "./axiosInstance";

interface PomodoroObject {
    id: number;
    startTime: number;
    endTime: number;
    duration: number
}

axios.defaults.withCredentials = true;

export async function InitPomodoro(pomodoroObject: PomodoroObject): Promise<number> {
    try {
        const response = await axiosInstance.post('http://localhost:8080/pomodoro', {pomodoroObject:pomodoroObject});
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

export async function deletePomodoro(id: number) {
    const response = await axios.delete('http://localhost:8080/pomodoro/', { data: { id: id } });
    return response.data;
}