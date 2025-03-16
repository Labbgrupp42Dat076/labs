import axios from "axios";

axios.defaults.withCredentials = true;

export async function InitPomodoro(): Promise<number> {
    try {
        const response = await axios.post('http://localhost:8080/pomodoro');
        if (response != undefined) {
            return response.data;
        } else {
            throw new Error('Failed to fetch pomodoros');
        }
    } catch (error) {
        console.error('Error in InitPomodoro:', error);
        throw error;
    }
}

export async function endPomodoro(id: number): Promise<number> {
    const response = await axios.post('http://localhost:8080/pomodoro/end' + id);
    return response.data;
}

export async function deletePomodoro(id: number) {
    const response = await axios.delete('http://localhost:8080/pomodoro/' + id);
    return response.data;
}