export interface User{
    id: number;
    name: string;
    password: string;
    noteIds: number[];
    todoIds: number[];
    lastPomodoroSession: number;
}