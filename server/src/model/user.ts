export interface User{
    id: number;
    name: string;
    password: string;
    noteIds: number[];
    todoIds: number[];
    pomodoroIds: number[];
    lastPomodoroSession: number;
}