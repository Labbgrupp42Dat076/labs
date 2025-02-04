export interface user{
    id: number;
    name: string;
    password: string;
    noteIds: number[];
    todoIds: number[];
    lastPomodoroSession: number;
}