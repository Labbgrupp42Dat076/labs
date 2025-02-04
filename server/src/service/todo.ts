import { TodoObject } from '../model/todoObject';

class todoService {
    todoList: Array<TodoObject> = [];
    public async getTodos() {
        return await this.todoList;
    }

    public async addTodos(todo: TodoObject) {
        this.todoList.push(todo);
        return await this.todoList;
    }

    public async updateTodos(todo: TodoObject) {
        this.todoList = this.todoList.map((item) => {
            if (item.id === todo.id) {
                return todo;
            }
            return item;
        });
        return await this.todoList;
    }

    public async deleteTodos(id: number) {
        this.todoList = this.todoList.filter((item) => item.id !== id);
        return await this.todoList;
    }

    public async getTodoById(id: number) {
        return await this.todoList.find((item) => item.id === id);
    }


}
