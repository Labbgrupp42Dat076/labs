import express, { Request, Response } from "express";


import { PomodoroObject } from "../model/pomodoroObject";
import { PomodoroServiceWithDb } from "../service/pomodoroWithDb";
import { IPomodoroService } from "../service/pomodoroInterface";
import { ErrorMessage } from "../../utilities/error_message";
import { check_session } from "../../utilities/session_checker";
import { User } from "../model/user";
import { UserService } from "../service/user";


const pomodoroService: IPomodoroService = new PomodoroServiceWithDb();
const pomodoroRouter = express.Router();

pomodoroRouter.post("/", async (req: Request, res: Response) => {
    console.log("init-bruv " + req.body.pomodoroObject.id);
    try {
        const user: User = await check_session(req);
        const localPomodoroObject: PomodoroObject = req.body.pomodoroObject;
        localPomodoroObject.userId = user.id;
        const id: number = await pomodoroService.initPomodoroSession(localPomodoroObject);

        res.status(200).json({ message: 'Pomodoro session created', id: id });

    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

pomodoroRouter.get("/", async (req: Request, res: Response) => {
    try {
        const user: User = await check_session(req);
        const pomodoroSessions: PomodoroObject[] = await pomodoroService.getPomodoroSessions(user.id);
        res.status(200).json(pomodoroSessions);

    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
}
);

pomodoroRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const user: User = await check_session(req);
        await pomodoroService.deletePomodoroSession(parseInt(req.params.id));
        res.status(200).json({ message: 'Pomodoro session deleted' });

    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

export default pomodoroRouter;