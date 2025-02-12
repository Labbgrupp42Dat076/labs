import express, { Request, Response } from "express";
import { User } from "../model/user";
import userService from "../service/user";
import { ErrorMessage } from "../../utilities/error_message";

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
    await userService.login(req.body.name, req.body.password);
    res.status(200).json({ message: 'Login successful' });
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
userRouter.delete("/:userId/notes/:noteId", async (req: Request, res: Response) => {
  try {
    await userService.deleteNoteId(parseInt(req.params.userId), parseInt(req.params.noteId));
    res.status(200).json({ message: 'Note deleted' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// add link between note and user
userRouter.post("/:userId/notes/:noteId", async (req: Request, res: Response) => {
  try {
    await userService.addNoteId(parseInt(req.params.userId), parseInt(req.params.noteId));
    res.status(200).json({ message: 'Note added' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


//delete link between todo and user
userRouter.delete("/:userId/todos/:todoId", async (req: Request, res: Response) => {
  try {
    await userService.deleteTodoId(parseInt(req.params.userId), parseInt(req.params.todoId));
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// add link between todo and user
userRouter.post("/:userId/todos/:todoId", async (req: Request, res: Response) => {
  try {
    await userService.addTodoId(parseInt(req.params.userId), parseInt(req.params.todoId));
    res.status(200).json({ message: 'Todo added' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


// update username
userRouter.put("/:id/name", async (req: Request, res: Response) => {
  try {
    await userService.updateUserNames(parseInt(req.params.id), req.body.name);
    res.status(200).json({ message: 'Name updated' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// update password
userRouter.put("/:id/password", async (req: Request, res: Response) => {
  try {
    await userService.updateUserPasswords(parseInt(req.params.id), req.body.password);
    res.status(200).json({ message: 'Password updated' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


// set last pomodoro session to now
userRouter.post("/:id/pomodoro", async (req: Request, res: Response) => {
  try {
    await userService.setLastPomodoroSessionToNow(parseInt(req.params.id));
    res.status(200).json({ message: 'Pomodoro session updated' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});

// get last pomodoro session
userRouter.get("/:id/pomodoro", async (req: Request, res: Response) => {
  try {
    const lastPomodoroSession = await userService.getLastPomodoroSession(parseInt(req.params.id));
    res.status(200).json(lastPomodoroSession);
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


export default userRouter;
