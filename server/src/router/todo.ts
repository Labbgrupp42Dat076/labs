import express, { Request, Response } from "express";

import { TodoDBService } from "../service/todoDbService";
import { ITodoService } from "../service/interface/todo.service";
import { TodoObject } from "../model/todoObject";
import { ErrorMessage } from "../../utilities/error_message";
const todoRouter = express.Router();

import { check_session } from "../../utilities/session_checker";
import { User } from "../model/user";

const todoService:ITodoService = new TodoDBService();


/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: Todo items management and operations
 */


/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Retrieve all todos for the current user
 *     tags: [Todo]
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoObject'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
todoRouter.get("/", async (req: Request, res: Response) => {
    try {
        const user = await check_session(req);

        const todoIds: number[] = user.todoIds;
        const todos: TodoObject[] = await todoService.getTodosByListOfIds(todoIds);
    
        res.status(200).json(todos);
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});


/**
 * @swagger
 * /todo/list:
 *   get:
 *     summary: Retrieve todos by a list of IDs
 *     tags: [Todo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: List of todo IDs to retrieve
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoObject'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
todoRouter.get("/list", async (req: Request, res: Response) => {
    try {
        const todos = await todoService.getTodosByListOfIds(req.body.ids);
        res.status(200).json(todos);
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the todo to delete
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
todoRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const user: User = await check_session(req);

        user.todoIds = user.todoIds.filter((id: number) => id !== parseInt(req.params.id));

        req.session.user = user;

        await todoService.deleteTodos(parseInt(req.params.id));
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});


/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Add a new todo
 *     tags: [Todo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the todo
 *                 example: "Buy groceries"
 *     responses:
 *       200:
 *         description: Todo added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: number
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
todoRouter.post("/", async (req: Request, res: Response) => {
    try {
        const todo: TodoObject = {
            id: 0,
            title: req.body.title,
            completed: false
        };
        if (!todo.title) {
            throw new ErrorMessage("Title is required", 404);
        }
        const id: number = await todoService.addTodos(todo);
        res.status(200).json({ message: 'Todo added', id: id });
        
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});



/**
 * @swagger
 * /todo/{id}/done:
 *   post:
 *     summary: Mark a todo as done
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the todo to mark as done
 *     responses:
 *       200:
 *         description: Todo marked as done successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
todoRouter.post("/:id/done", async (req: Request, res: Response) => {
    try {
        // check_session(req)
        await todoService.setTodoDone(parseInt(req.params.id));
        res.status(200).json({ message: 'Todo done' });
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});



/**
 * @swagger
 * /todo/{id}/undone:
 *   post:
 *     summary: Mark a todo as not done
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the todo to mark as not done
 *     responses:
 *       200:
 *         description: Todo marked as not done successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
todoRouter.post("/:id/undone", async (req: Request, res: Response) => {
    try {
        // check_session(req)
        await todoService.setTodoUndone(parseInt(req.params.id));
        res.status(200).json({ message: 'Todo undone' });
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});


export default todoRouter;
