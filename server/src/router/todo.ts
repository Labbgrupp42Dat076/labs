import express, { Request, Response } from "express";

import todoService from "../service/todo";
import { TodoObject } from "../model/todoObject";

const todoRouter = express.Router();

// get all todos 
todoRouter.get("/", async (req: Request, res: Response) => {
    try {
        const todos = await todoService.getTodos();
        res.status(200).json(todos);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(404).json({ message: errorMessage });
    }
});

// get all todos from a list of ids
todoRouter.get("/list", async (req: Request, res: Response) => {
    try {
        const todos = await todoService.getTodosByListOfIds(req.body.ids);
        res.status(200).json(todos);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(404).json({ message: errorMessage });
    }
});

// delete a todo
todoRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        await todoService.deleteTodos(parseInt(req.params.id));
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(404).json({ message: errorMessage });
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
        res.status(200).json({ message: 'Todo added' + id });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(404).json({ message: errorMessage });
    }
});

// done a todo
todoRouter.post("/:id/done", async (req: Request, res: Response) => {
    try {
        await todoService.setTodoDone(parseInt(req.params.id));
        res.status(200).json({ message: 'Todo done' });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(404).json({ message: errorMessage });
    }

});


// undone a todo

todoRouter.post("/:id/undone", async (req: Request, res: Response) => {
    try {
        await todoService.setTodoUndone(parseInt(req.params.id));
        res.status(200).json({ message: 'Todo undone' });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(404).json({ message: errorMessage });
    }

});


export default todoRouter;