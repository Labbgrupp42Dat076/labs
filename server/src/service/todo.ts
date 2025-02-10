import { TodoObject } from '../model/todoObject';

export class TodoService {
    todoList: Array<TodoObject> = [];
    

    // internal methods
    private  getTodoById(id: number): TodoObject {
        let output = this.todoList.find((item) => item.id === id);
        if (output) {
            return output;
        } else {
            throw new Error('Todo not found');
        }
    }

    private updateTodos(todo: TodoObject): TodoObject[] {
        this.todoList = this.todoList.map((item) => {
            return this.getTodoById(todo.id) === item ? todo : item;
        });

        return this.todoList;
    }


    // external methods
    public async getTodos(): Promise<TodoObject[]> {
        return await this.todoList;
    }


    public async getTodo(id: number): Promise<TodoObject> {
        return await this.getTodoById(id)
    }

    public async getTodosByListOfIds(ids: number[]): Promise<TodoObject[]> {
        let output = this.todoList.filter((item) => ids.includes(item.id));
        return await output;
    }


    public async addTodos(todo: TodoObject): Promise<number> {
        //this should be db things
        // generate id
        this.todoList.push(todo);
        return todo.id;
    }

 

    public async deleteTodos(id: number): Promise<TodoObject[]> {
        this.todoList = this.todoList.filter((item) => item.id !== id);
        return await this.todoList;
    }

    public async setTodoDone(id: number): Promise<TodoObject[]> {
        let todo = this.getTodoById(id);
        todo.completed = true;
        return await this.updateTodos(todo);
    }

    public async setTodoUndone(id: number): Promise<TodoObject[]> {
        let todo = this.getTodoById(id);
        todo.completed = false;
        return await this.updateTodos(todo);
    }


}

