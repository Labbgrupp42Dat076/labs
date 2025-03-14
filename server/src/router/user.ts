import express, { Request, Response } from "express";
import { User } from "../model/user";
import { IUserService } from "../service/userInterface";
import { UserService } from "../service/user";
import { UserDbService } from "../service/userDb";
import { ErrorMessage } from "../../utilities/error_message";
import { check_session } from "../../utilities/session_checker"

const userService: IUserService = new UserDbService();
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
      id: await userService.getNewUserId(),
      name: req.body.name,
      password: req.body.password,
      noteIds: [],
      todoIds: [],
      pomodoroIds: [],
      lastPomodoroSession: 0
    };



    await userService.register(user);
    req.session.user = user;
    res.status(200).json({ message: 'Registration successful' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// delete link between note and user
userRouter.delete("/notes/:noteId", async (req: Request, res: Response) => {
  try {

    let userId: number = await getUserIdFromCookies(req);
    await userService.deleteNoteId(userId, parseInt(req.params.noteId));
    await updateUserCookie(req, userId);
    res.status(200).json({ message: 'Note deleted' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// add link between note and user
userRouter.post("/notes/", async (req: Request, res: Response) => {
  try {


    let userId: number = await getUserIdFromCookies(req);
    await userService.addNoteId(userId, parseInt(req.body.noteId));
    await updateUserCookie(req, userId);
    res.status(200).json({ message: 'Note added' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// delete link between pomodoro and user
userRouter.delete("/pomodoros/:pomodoroId", async (req: Request, res: Response) => {
  try {

    let userId: number = await getUserIdFromCookies(req);
    await userService.deletePomodoroId(userId, parseInt(req.params.pomodoroId));
    await updateUserCookie(req, userId);
    res.status(200).json({ message: 'Pomodoro deleted' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


//delete link between todo and user
userRouter.delete("/todos/:todoId", async (req: Request, res: Response) => {
  try {


    let userId: number = await getUserIdFromCookies(req);

    await userService.deleteTodoId(userId, parseInt(req.params.todoId));
    await updateUserCookie(req, userId);

    res.status(200).json({ message: 'Todo deleted' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// add link between todo and user
userRouter.post("/todo/", async (req: Request, res: Response) => {
  try {
    const todoId: number = parseInt(req.body.todoId);

    let userId: number = await getUserIdFromCookies(req);
    
    await userService.addTodoId(userId, todoId);
    await updateUserCookie(req, userId);


    res.status(200).json({ message: 'Todo added', id: req.body.todoId });

  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


// update username
userRouter.put("/name", async (req: Request, res: Response) => {
  try {

    let userId: number = await getUserIdFromCookies(req);
    await userService.updateUserNames(userId, req.body.name);
    await updateUserCookie(req, userId);
    res.status(200).json({ message: 'Name updated' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// update password
userRouter.put("/password", async (req: Request, res: Response) => {
  try {

    let userId: number = await getUserIdFromCookies(req);
    await userService.updateUserPasswords(userId, req.body.password);
    await updateUserCookie(req, userId);
    res.status(200).json({ message: 'Password updated' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


// set last pomodoro session to now
userRouter.post("/pomodoro", async (req: Request, res: Response) => {
  try {

    let userId: number = await getUserIdFromCookies(req);
    await userService.setLastPomodoroSessionToNow(userId);
    await updateUserCookie(req, userId);
    res.status(200).json({ message: 'Pomodoro session updated' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// get last pomodoro session
userRouter.get("/pomodoro", async (req: Request, res: Response) => {
  try {

    let userId: number = await getUserIdFromCookies(req);
    const lastPomodoroSession = await userService.getLastPomodoroSession(userId);
    await updateUserCookie(req, userId);
    res.status(200).json(lastPomodoroSession);
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


export default userRouter;
async function getUserIdFromCookies(req: Request) {


  const user:User = await check_session(req);
  let userId: number;
  if (user) {
    userId = user.id;
  } else {
    throw new ErrorMessage('User not logged in', 400);
  }
  return userId;
}

async function updateUserCookie(req: Request, userId: number) {
    req.session.user = await userService.getUser(userId);
}

