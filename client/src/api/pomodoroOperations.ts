import axios from "axios";

axios.defaults.withCredentials = true;

export async function InitPomodoro() {
    const response = await axios.get('http://localhost:8080/pomodoro');
    return response.data;
}

export async function endPomodoro(id: number): Promise<number> {
    const response = await axios.post('http://localhost:8080/pomodoro/end' + id);
    return response.data;
}

export async function deletePomodoro(id: number) {
    const response = await axios.delete('http://localhost:8080/pomodoro/' + id);
    return response.data;
}