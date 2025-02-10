import { TodoService } from "../service/todo"
import { TodoObject } from "../model/todoObject";

test("If a task is added to the list then it should be in the list", async () => {
    
    const todoService = new TodoService();
    const todoObj: TodoObject = {
        id:0,
        title: "Test description",
        completed: false
    }
    await todoService.addTodos(todoObj);
    const todo = await todoService.getTodos();

    expect(todo.some((todo) => todo === todoObj)).toBeTruthy();
})