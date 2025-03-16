import { ErrorMessage } from '../../utilities/error_message';
import { PomodoroObject} from '../model/pomodoroObject'
import { IPomodoroService } from './pomodoroInterface';

import { PomodoroModel } from "../db/pomodoroObject.db";

export class PomodoroServiceWithDb implements IPomodoroService {


    public initPomodoroSession() {
        const id = Math.floor(Date.now() / 1000);
        const startTime = Math.floor(Date.now() / 1000);
        const endTime = 0;
        const duration = 0;


        const pomodoroTemp: PomodoroObject = {
            id,
            startTime,
            endTime,
            duration
        };

        PomodoroModel.create({
            id,
            startTime,
            endTime,
            duration
        });

        return pomodoroTemp.id;
    }


    public async setPomodoroSessionEndTime(id: number) {
        const pomodoroSession = await PomodoroModel.findByPk(id);
        if (pomodoroSession) {
            pomodoroSession.endTime = Math.floor(Date.now() / 1000);
            pomodoroSession.duration = (pomodoroSession.endTime - pomodoroSession.startTime) / 60000;
        } else {
            throw new ErrorMessage('Pomodoro session not found', 404);
        }
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

