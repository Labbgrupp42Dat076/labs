import { PomodoroObject } from "../model/pomodoroObject";

export interface IPomodoroService {



    initPomodoroSession(pomodoroObject: PomodoroObject): Promise<number> ;
    getPomodoroSessions(userId:number):  Promise <PomodoroObject[] >
    deletePomodoroSession(id: number): void ;
    

}
