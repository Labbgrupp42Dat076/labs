import axios from "axios";

axios.defaults.withCredentials = true;

export async function InitPomodoro() {
    const response = await axios.get('http://localhost:8080/pomodoro');
    return response.data;
}

export async function endPomodoro() {
    const response = await axios.post('http://localhost:8080/pomodoro/end');
    return response.data;
}