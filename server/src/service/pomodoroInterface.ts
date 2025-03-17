import { PomodoroObject } from "../model/pomodoroObject";

export interface IPomodoroService {



    initPomodoroSession(pomodoroObject: PomodoroObject): Promise<number> ;

    getPomodoroSessions():  Promise <PomodoroObject[] >

    deletePomodoroSession(id: number): void ;
    

}
