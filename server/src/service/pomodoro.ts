import { ErrorMessage } from '../../utilities/error_message';
import { PomodoroObject} from '../model/pomodoroObject'

export class PomodoroService {

    private _pomodoroSessions: PomodoroObject[] = [];

    public initPomodoroSession() {
        const id = this._pomodoroSessions.length;
        const startTime = new Date();
        const endTime = new Date();
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
            pomodoroSession.endTime = new Date();
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

const pomodoroService = new PomodoroService();

export default pomodoroService;