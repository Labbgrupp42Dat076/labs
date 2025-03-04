import express, { Request, Response } from "express";

import { TodoDBService } from "../service/todoDbService";
import { TodoObject } from "../model/todoObject";
import { ErrorMessage } from "../../utilities/error_message";
const todoRouter = express.Router();

import { check_session } from "../../utilities/session_checker";
import { User } from "../model/user";

const todoService = new TodoDBService();

// get all todos 
todoRouter.get("/", async (req: Request, res: Response) => {
    try {

        //todo move this to note?? maybe functionally decompose
        const user = await check_session(req);
        console .log("user is " + user.id)

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
        const user: User =  await  check_session(req)

        user.todoIds = user.todoIds.filter((id: number) => id !== parseInt(req.params.id));


        req.session.user = user;

        await todoService.deleteTodos(parseInt(req.params.id));
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

// add a todo
todoRouter.post("/", async (req: Request, res: Response) => {
    console.log("added todo")
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
        console.log("added todo id " + id)
        res.status(200).json({ message: 'Todo added', id: id });
        
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

// done a todo
todoRouter.post("/:id/done", async (req: Request, res: Response) => {
    try {
        // check_session(req)
        console.log("done")
        await todoService.setTodoDone(parseInt(req.params.id));
        res.status(200).json({ message: 'Todo done' });
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }

});


// undone a todo

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