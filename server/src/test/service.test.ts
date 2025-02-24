import { TodoService } from "../service/todo"
import { TodoObject } from "../model/todoObject";
import { NoteService } from "../service/note";
import { Note } from "../model/note";
import { PomodoroService } from "../service/pomodoro";
import { PomodoroObject } from "../model/pomodoroObject";

import { ErrorMessage } from "../../utilities/error_message";

// ------------------------ Todos ------------------------

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

// ------------------------ Notes ------------------------

test("If a note is created then it should be in the list", async () => {
    const noteService = new NoteService();

    await noteService.createNote("testNote", "id3", [1,2,3]);
    const notes: Note[] = await noteService.getNotes();

    expect(notes.length == 1);
    expect(notes[0].title == "testNote").toBeTruthy();
})

// ------------------------ Pomodoro ------------------------

test("If a timer session is created then it should be in the list", async () => {
    const pomodoroService = new PomodoroService();

    await pomodoroService.initPomodoroSession();
    const pomodoroIds: PomodoroObject[] = await pomodoroService.getPomodoroSessions();

    expect(pomodoroIds.length == 1);
    expect(pomodoroIds[0].id == 0).toBeTruthy();
})

test("If a pomodoro session is ended then the end time should be updated", async () => {
    const pomodoroService = new PomodoroService();

    await pomodoroService.initPomodoroSession();
    const pomodoroIds: PomodoroObject[] = await pomodoroService.getPomodoroSessions();
    const id = pomodoroIds[0].id;

    await pomodoroService.setPomodoroSessionEndTime(id);
    const endTime = pomodoroIds[0].endTime;

    expect(endTime).not.toBeNull();
})

test("If a pomodoro session is deleted then it should be removed from the list", async () => {
    const pomodoroService = new PomodoroService();

    await pomodoroService.initPomodoroSession();
    const pomodoroIds: PomodoroObject[] = await pomodoroService.getPomodoroSessions();
    const id = pomodoroIds[0].id;

    await pomodoroService.deletePomodoroSession(id);
    const pomodoroIds2: PomodoroObject[] = await pomodoroService.getPomodoroSessions();

    expect(pomodoroIds2.length == 0);
})

test("If the list of pomodoro sessions are empty then you should get an error code for trying to delet an object", async () => {
    const pomodoroService = new PomodoroService();

    try {
        await pomodoroService.deletePomodoroSession(0);
    } catch (error: any) {
        expect(error.message == 'Pomodoro session not found');
        expect(error.code == 404);
    }
}
)