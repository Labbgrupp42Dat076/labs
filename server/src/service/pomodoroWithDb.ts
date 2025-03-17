import { ErrorMessage } from '../../utilities/error_message';
import { PomodoroObject} from '../model/pomodoroObject'
import { IPomodoroService } from './pomodoroInterface';

import { PomodoroModel } from "../db/pomodoroObject.db";
import { start } from 'repl';

export class PomodoroServiceWithDb implements IPomodoroService {


    public async initPomodoroSession(pomodoroObject: PomodoroObject): Promise<number> {
        const id = pomodoroObject.id;
        const startTime = pomodoroObject.startTime;
        const endTime = pomodoroObject.endTime;
        const duration = pomodoroObject.duration;

        await PomodoroModel.create({
            id,
            startTime,
            endTime,
            duration
        });

        return id;
    }

    public async getPomodoroSessions() {
        return await PomodoroModel.findAll();
    }

    public async deletePomodoroSession(id: number) {
        try {
            PomodoroModel.destroy({where: {id}});
        } catch (error) {
            throw new ErrorMessage('Pomodoro session not found', 404);
        }    
    }

}

