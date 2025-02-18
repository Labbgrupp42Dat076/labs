import express, { Request, Response } from "express";

import todoService from "../service/todo";
import { TodoObject } from "../model/todoObject";
import { ErrorMessage } from "../../utilities/error_message";
const todoRouter = express.Router();

import { check_session } from "../../utilities/session_checker";

// get all todos 
todoRouter.get("/", async (req: Request, res: Response) => {
    try {

        //todo move this to note?? maybe functionally decompose
        const user = check_session(req);

        const todoIds: number[] = await user.todoIds
        const todos: TodoObject[]= await todoService.getTodosByListOfIds(todoIds);
    
        res.status(200).json(todos);
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

// get all todos from a list of ids
todoRouter.get("/list", async (req: Request, res: Response) => {
    try {
        const todos = await todoService.getTodosByListOfIds(req.body.ids);
        res.status(200).json(todos);
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

// delete a todo
todoRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        check_session(req)
        await todoService.deleteTodos(parseInt(req.params.id));
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

// add a todo
todoRouter.post("/", async (req: Request, res: Response) => {
    try {
        const todo: TodoObject = {
            id: 0,
            title: req.body.title,
            completed: false
        };
        const id: number = await todoService.addTodos(todo);
        res.status(200).json({ message: 'Todo added', id: id });
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

// done a todo
todoRouter.post("/:id/done", async (req: Request, res: Response) => {
    try {
        check_session(req)
        await todoService.setTodoDone(parseInt(req.params.id));
        res.status(200).json({ message: 'Todo done' });
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }

});


// undone a todo

todoRouter.post("/:id/undone", async (req: Request, res: Response) => {
    try {
        check_session(req)
        await todoService.setTodoUndone(parseInt(req.params.id));
        res.status(200).json({ message: 'Todo undone' });
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }

});


export default todoRouter;