import { TodoObject } from "../model/todoObject"
import { TodoModel as TodoModel } from "../db/todoObject.db"
import { ITodoService } from "./interface/todo.service"
import { ErrorMessage } from "../../utilities/error_message";


export class TodoDBService implements ITodoService {

    public async getTodos(): Promise<TodoObject[]> {
        let todos = await TodoModel.findAll();
        return todos.map(todo => {
            return {
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }
        })
    }

    public async getTodo(id: number): Promise<TodoObject> {
        let todo = await TodoModel.findByPk(id);
        if (todo) {
            return {
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }
        } else {
            throw new ErrorMessage("Todo not found", 404);
        }
    }

    public async getTodoById(id: number): Promise<TodoObject> {
        let todo = await TodoModel.findByPk(id);
        if (todo) {
            return {
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }
        } else {
            throw new ErrorMessage("Todo not found", 404);
        }
    }

    public async getTodosByListOfIds(ids: number[]): Promise<TodoObject[]> {
        let todos: TodoObject[] | null = await TodoModel.findAll({
            where: {
                id: ids
            }
        });
        return todos.map(todo => {
            return {
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }
        })
    }

    public async addTodos(todo: TodoObject): Promise<number> {
        let newTodo = await TodoModel.create({
            id: Math.floor(Date.now() / 1000),
            title: todo.title,
            completed: todo.completed
        });

        console.log("new todo id " + newTodo.id)
        return newTodo.id;
    }

    public async deleteTodos(id: number): Promise<TodoObject[]> {
        let todo = await TodoModel.findByPk(id);
        if (todo) {
            await todo.destroy();
            return await this.getTodos();
        } else {
            throw new ErrorMessage("Todo not found", 404);
        }
    }

    public async setTodoDone(id: number): Promise<TodoObject[]> {
        let todo = await TodoModel.findByPk(id);
        if (todo) {
            todo.completed = true;
            await todo.save();
            return await this.getTodos();
        } else {
            throw new ErrorMessage("Todo not found", 404);
        }
    }

    public async setTodoUndone(id: number): Promise<TodoObject[]> {
        let todo = await TodoModel.findByPk(id);
        if (todo) {
            todo.completed = false;
            await todo.save();
            return await this.getTodos();
        } else {
            throw new ErrorMessage("Todo not found", 404);
        }
    }
}