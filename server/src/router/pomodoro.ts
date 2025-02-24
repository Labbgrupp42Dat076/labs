import express, { Request, Response } from "express";

import {PomodoroService} from "../service/pomodoro";
import { PomodoroObject } from "../model/pomodoroObject";

import { ErrorMessage } from "../../utilities/error_message";
import { check_session } from "../../utilities/session_checker";
import { User } from "../model/user";

const pomodoroRouter = express.Router();

pomodoroRouter.post("/", async (req: Request, res: Response) => {
    try {
        const user: User = await check_session(req);
        const pomodoroService: PomodoroService = new PomodoroService();
        const id: number = await pomodoroService.initPomodoroSession();
        res.status(200).json({ message: 'Pomodoro session created', id: id });

    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
}
);

pomodoroRouter.post("/end", async (req: Request, res: Response) => {
    try {
        const user: User = await check_session(req);
        const pomodoroService: PomodoroService = new PomodoroService();
        await pomodoroService.setPomodoroSessionEndTime(req.body.id);
        res.status(200).json({ message: 'Pomodoro session ended' });

    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
}
);

pomodoroRouter.get("/", async (req: Request, res: Response) => {
    try {
        const user: User = await check_session(req);
        const pomodoroService: PomodoroService = new PomodoroService();
        const pomodoroSessions: PomodoroObject[] = await pomodoroService.getPomodoroSessions();
        res.status(200).json(pomodoroSessions);

    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
}
);

pomodoroRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const user: User = await check_session(req);
        const pomodoroService: PomodoroService = new PomodoroService();
        await pomodoroService.deletePomodoroSession(parseInt(req.params.id));
        res.status(200).json({ message: 'Pomodoro session deleted' });

    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
}
);