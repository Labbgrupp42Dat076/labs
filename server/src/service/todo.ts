import { TodoObject } from '../model/todoObject';

class todoService {
    todoList: Array<TodoObject> = [];
    

    // internal methods
    private  getTodoById(id: number) {
        let output = this.todoList.find((item) => item.id === id);
        if (output) {
            return output;
        } else {
            throw new Error('Todo not found');
        }
    }

    private updateTodos(todo: TodoObject) {
        this.todoList = this.todoList.map((item) => {
            return this.getTodoById(todo.id) === item ? todo : item;
        });

        return this.todoList;
    }


    // external methods
    public async getTodos() {
        return await this.todoList;
    }


    public async getTodo(id: number){
        return await this.getTodoById(id)
    }

    public async getTodosByListOfIds(ids: number[]) {
        let output = this.todoList.filter((item) => ids.includes(item.id));
        return await output;
    }


    public async addTodos(todo: TodoObject) {
        //this should be db things
        // generate id
        this.todoList.push(todo);
        return todo.id;
    }

 

    public async deleteTodos(id: number) {
        this.todoList = this.todoList.filter((item) => item.id !== id);
        return await this.todoList;
    }

    public async setTodoDone(id: number) {
        let todo = this.getTodoById(id);
        todo.completed = true;
        return await this.updateTodos(todo);
    }

    public async setTodoUndone(id: number) {
        let todo = this.getTodoById(id);
        todo.completed = false;
        return await this.updateTodos(todo);
    }


}

export default new todoService();
