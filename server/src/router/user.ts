import express, { Request, Response } from "express";
import { User } from "../model/user";
import userService from "../service/user";
import { ErrorMessage } from "../../utilities/error_message";
import { check_session } from "../../utilities/session_checker"

declare module 'express-session' {
  interface SessionData {
    user?: User;
  }
}

const userRouter = express.Router();

// get a user
userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser(parseInt(req.params.id));
    res.status(200).json(user);
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// login
userRouter.post("/login", async (req: Request, res: Response) => {
  try {

    console.log(req.body)
    const user: User = await userService.login(req.body.name, req.body.password);
    req.session.user = user;
    res.status(200).json({
      message: 'Login successful',
      user: user
    });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// log out 
userRouter.post("/logout", async (req: Request, res: Response) => {
  try {
    req.session.user = undefined;
    res.status(200).json({ message: 'Logout successful' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


// register
userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: 0,
      name: req.body.name,
      password: req.body.password,
      noteIds: [],
      todoIds: [],
      lastPomodoroSession: 0
    };
    await userService.register(user);
    res.status(200).json({ message: 'Registration successful' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// delete link between note and user
userRouter.delete("/notes/:noteId", async (req: Request, res: Response) => {
  try {

    let userId: number = getUserIdFromCookies(req);
    await userService.deleteNoteId(userId, parseInt(req.params.noteId));
    res.status(200).json({ message: 'Note deleted' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// add link between note and user
userRouter.post("/notes/:noteId", async (req: Request, res: Response) => {
  try {


    let userId: number = getUserIdFromCookies(req);
    await userService.addNoteId(userId, parseInt(req.params.noteId));
    res.status(200).json({ message: 'Note added' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


//delete link between todo and user
userRouter.delete("/todos", async (req: Request, res: Response) => {
  try {


    let userId: number = getUserIdFromCookies(req);
    await userService.deleteTodoId(userId, parseInt(req.body.todoId));
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// add link between todo and user
userRouter.post("/todo/", async (req: Request, res: Response) => {
  try {

    let userId: number = getUserIdFromCookies(req);
    await userService.addTodoId(userId, parseInt(req.body.todoId));
    res.status(200).json({ message: 'Todo added', id: req.body.todoId });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


// update username
userRouter.put("/name", async (req: Request, res: Response) => {
  try {

    let userId: number = getUserIdFromCookies(req);
    await userService.updateUserNames(userId, req.body.name);
    res.status(200).json({ message: 'Name updated' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// update password
userRouter.put("/password", async (req: Request, res: Response) => {
  try {

    let userId: number = getUserIdFromCookies(req);
    await userService.updateUserPasswords(userId, req.body.password);
    res.status(200).json({ message: 'Password updated' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


// set last pomodoro session to now
userRouter.post("/pomodoro", async (req: Request, res: Response) => {
  try {

    let userId: number = getUserIdFromCookies(req);
    await userService.setLastPomodoroSessionToNow(userId);
    res.status(200).json({ message: 'Pomodoro session updated' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// get last pomodoro session
userRouter.get("/pomodoro", async (req: Request, res: Response) => {
  try {

    let userId: number = getUserIdFromCookies(req);
    const lastPomodoroSession = await userService.getLastPomodoroSession(userId);
    res.status(200).json(lastPomodoroSession);
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


export default userRouter;
function getUserIdFromCookies(req: Request) {
  check_session(req);
  let userId: number;
  req.session.user?.id ? userId = req.session.user?.id : userId = 0;
  return userId;
}

