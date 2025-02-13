import { TodoService } from "../service/todo"
import { TodoObject } from "../model/todoObject";
import { NoteService } from "../service/note";
import { Note } from "../model/note";

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

test("If a note is created then it should be in the list", async () => {
    const noteService = new NoteService();

    await noteService.createNote("testNote", "id3");
    const notes: Note[] = await noteService.getNotes();

    expect(notes.length == 1);
    expect(notes[0].title == "testNote").toBeTruthy();
})
