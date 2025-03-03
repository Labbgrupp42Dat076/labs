import { PomodoroObject } from "../model/pomodoroObject";

export interface IPomodoroService {



    initPomodoroSession(): number;


    setPomodoroSessionEndTime(id: number): void ;
    getPomodoroSessions():  Promise <PomodoroObject[] >

    deletePomodoroSession(id: number): void ;
    

}
