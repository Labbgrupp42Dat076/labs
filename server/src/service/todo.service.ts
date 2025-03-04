import { TodoObject } from '../model/todoObject';

export interface ITodoService {
    // Returns all todos
    getTodos(): Promise<TodoObject[]>;

    // Returns a todo by id
    getTodo(id: number): Promise<TodoObject>;

    // Returns a list of todos by a list of ids
    getTodosByListOfIds(ids: number[]): Promise<TodoObject[]>;

    // Adds a todo to the list
    addTodos(todo: TodoObject): Promise<number>;

    // Deletes a todo by id
    deleteTodos(id: number): Promise<TodoObject[]>;
    setTodoDone(id: number): Promise<TodoObject[]>;
    setTodoUndone(id: number): Promise<TodoObject[]>;
}
