import express, { Request, Response } from "express";
import { User } from "../model/user";
import userService from "../service/user";
import { TodoObject } from "../model/todoObject";
import todoService from "../service/todo";

const router = express.Router();

// get all tasks from a user
router.get("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const todos: number[] = await userService.getTodoIds(parseInt(req.params.id));
    const todoList: TodoObject[] = [];
    for (let i = 0; i < todos.length; i++) {
      const todo: TodoObject = await todoService.getTodo(todos[i]);
      todoList.push(todo);
    }
    res.status(200).json(todoList);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(404).json({ message: errorMessage });
    }
});