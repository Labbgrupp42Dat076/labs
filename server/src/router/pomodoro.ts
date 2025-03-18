import express, { Request, Response } from "express";

import { PomodoroObject } from "../model/pomodoroObject";
import { PomodoroServiceWithDb } from "../service/pomodoroWithDb";
import { IPomodoroService } from "../service/interface/pomodoroInterface";
import { ErrorMessage } from "../../utilities/error_message";
import { check_session } from "../../utilities/session_checker";
import { User } from "../model/user";

const pomodoroService: IPomodoroService = new PomodoroServiceWithDb();
const pomodoroRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pomodoro
 *   description: Pomodoro management endpoints
 */

/**
 * @swagger
 * /Pomodoro:
 *   get:
 *     summary: Retrieve a list of pomodoro sessions
 *     tags: [Pomodoro]
 *     responses:
 *       200:
 *         description: A list of pomodoro sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PomodoroObject'
*         401:
*           description: Unauthorized
 */
pomodoroRouter.get("/", async (req: Request, res: Response) => {
    try {
        const user: User = await check_session(req);
        const pomodoroSessions: PomodoroObject[] = await pomodoroService.getPomodoroSessions(user.id);
        res.status(200).json(pomodoroSessions);
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

/**
 * @swagger
 * /Pomodoro:
 *   post:
 *     summary: Create a new pomodoro session
 *     tags: [Pomodoro]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pomodoroObject:
 *                 $ref: '#/components/schemas/PomodoroObject'
 *     responses:
 *       200:
 *         description: Pomodoro session created
 *      401:
 *         description: Unauthorized
 */
pomodoroRouter.post("/", async (req: Request, res: Response) => {
    try {
        const user: User = await check_session(req);
        const pomodoroObject: PomodoroObject = req.body.pomodoroObject;
        pomodoroObject.userId = user.id;
        await pomodoroService.initPomodoroSession(pomodoroObject);
        res.status(200).json({ message: 'Pomodoro session created'});

    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});



/**
 * @swagger
 * /Pomodoro/{id}:
 *   delete:
 *     summary: Delete a pomodoro session
 *     tags: [Pomodoro]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the pomodoro session to delete
 *     responses:
 *       200:
 *         description: Pomodoro session deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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