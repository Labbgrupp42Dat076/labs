import { ErrorMessage } from '../../../utilities/error_message';
import { PomodoroObject} from '../../model/pomodoroObject'
import { IPomodoroService } from '../interface/pomodoroInterface';

export class PomodoroService implements IPomodoroService {

    private _pomodoroSessions: PomodoroObject[] = [];

    public initPomodoroSession() {
        const id = this._pomodoroSessions.length;
        const startTime = Date.now();
        const endTime = 0;
        const duration = 0;

        const pomodoroSession: PomodoroObject = {
            id,
            startTime,
            endTime,
            duration
        };
        this._pomodoroSessions.push(pomodoroSession);
        return pomodoroSession.id;
    }


    public async setPomodoroSessionEndTime(id: number) {
        const pomodoroSession = this._pomodoroSessions.find((item) => item.id === id);
        if (pomodoroSession) {
            pomodoroSession.endTime = Date.now();
            pomodoroSession.duration = (pomodoroSession.endTime - pomodoroSession.startTime) / 60000;
        } else {
            throw new ErrorMessage('Pomodoro session not found', 404);
        }
    }

    public async getPomodoroSessions() {
        return this._pomodoroSessions;
    }

    public async deletePomodoroSession(id: number) {
        try {
            this._pomodoroSessions = this._pomodoroSessions.filter((item) => item.id !== id);
        } catch (error) {
            throw new ErrorMessage('Pomodoro session not found', 404);
        }    
    }

}

