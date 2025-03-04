import { TodoObject } from "../model/todoObject"
import { TodoObject as TodoModel } from "../db/todoObject.db"
import { ITodoService } from "./todo.service"


export class TodoDBService implements ITodoService {

    async getTodos(): Promise<TodoObject[]> {
        let todos = await TodoModel.findAll();
        return todos.map(todo => {
            return {
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }
        })
    }

    async getTodo(id: number): Promise<TodoObject> {
        let todo = await TodoModel.findByPk(id);
        if (todo) {
            return {
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }
        } else {
            throw new Error("Todo not found");
        }
    }

    async getTodoById(id: number): Promise<TodoObject> {
        let todo = await TodoModel.findByPk(id);
        if (todo) {
            return {
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }
        } else {
            throw new Error("Todo not found");
        }
    }

    async getTodosByListOfIds(ids: number[]): Promise<TodoObject[]> {
        let todos = await TodoModel.findAll({
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

    async addTodos(todo: TodoObject): Promise<number> {
        let newTodo = await TodoModel.create({
            id: todo.id,
            title: todo.title,
            completed: todo.completed
        });
        return newTodo.id;
    }

    async deleteTodos(id: number): Promise<TodoObject[]> {
        let todo = await TodoModel.findByPk(id);
        if (todo) {
            await todo.destroy();
            return await this.getTodos();
        } else {
            throw new Error("Todo not found");
        }
    }

    async setTodoDone(id: number): Promise<TodoObject[]> {
        let todo = await TodoModel.findByPk(id);
        if (todo) {
            todo.completed = true;
            await todo.save();
            return await this.getTodos();
        } else {
            throw new Error("Todo not found");
        }
    }

    async setTodoUndone(id: number): Promise<TodoObject[]> {
        let todo = await TodoModel.findByPk(id);
        if (todo) {
            todo.completed = false;
            await todo.save();
            return await this.getTodos();
        } else {
            throw new Error("Todo not found");
        }
    }


}