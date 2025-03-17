import express, { Request, Response } from "express";
import { User } from "../model/user";
import { IUserService } from "../service/interface/userInterface";
import { UserService } from "../service/old/user";
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


/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and operations
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */
userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser(parseInt(req.params.id));
    res.status(200).json(user);
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
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




/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [User]
 *     security:
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
userRouter.post("/logout", async (req: Request, res: Response) => {
  try {
    req.session.user = undefined;
    res.status(200).json({ message: 'Logout successful' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});



/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration successful
 */
userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: await userService.getNewUserId(),
      name: req.body.name,
      password: req.body.password,
      noteIds: [],
      todoIds: []
    };



    await userService.register(user);
    req.session.user = user;
    res.status(200).json({ message: 'Registration successful' });
  } catch (error: unknown) {
    ErrorMessage.setResponseToErrorMessage(error, res);
  }
});


/**
 * @swagger
 * /user/notes/{noteId}:
 *   delete:
 *     summary: Delete the link between the user and a note
 *     tags: [User]
 *     parameters:
 *       - name: noteId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       400:
 *         description: User not logged in or error occurred
 */
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

/**
 * @swagger
 * /user/notes:
 *   post:
 *     summary: Add a note to the user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noteId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Note added successfully
 *       400:
 *         description: User not logged in or error occurred
 */
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

/**
 * @swagger
 * /user/todos/{todoId}:
 *   delete:
 *     summary: Delete the link between the user and a todo
 *     tags: [User]
 *     parameters:
 *       - name: todoId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       400:
 *         description: User not logged in or error occurred
 */
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

/**
 * @swagger
 * /user/todo:
 *   post:
 *     summary: Add a todo to the user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               todoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Todo added successfully
 *       400:
 *         description: User not logged in or error occurred
 */
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

/**
 * @swagger
 * /user/name:
 *   put:
 *     summary: Update the username of the user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Name updated successfully
 *       400:
 *         description: User not logged in or error occurred
 */
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

/**
 * @swagger
 * /user/password:
 *   put:
 *     summary: Update the password of the user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: User not logged in or error occurred
 */
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
