import { TodoDBService } from "../service/todoDbService";
import { ITodoService } from "../service/todo.service";
import { TodoObject } from "../model/todoObject";
import { NoteServiceWithDb } from "../service/noteWithDb";
import { INoteService } from "../service/noteInterface";
import { Note } from "../model/note";
import { PomodoroService } from "../service/pomodoro";
import { PomodoroObject } from "../model/pomodoroObject";
import { mock, Mock } from "node:test";
import { NoteModel } from "../db/note.db";
import { TodoModel } from "../db/todoObject.db";

import { ErrorMessage } from "../../utilities/error_message";
import { PomodoroServiceWithDb } from "../service/pomodoroWithDb";
import { IPomodoroService } from "../service/pomodoroInterface";

// ------------------------ Todos ------------------------
// mock db calls

// mock NoteModel
// mock sequelize 



jest.mock("../db/todoObject.db", () => {
    let mockTodo = {
        id: 0,
        title: "Test description",
        completed: false
    }
    return {
        TodoModel: {
            findAll: () => {
                return [
                    {
                        id: mockTodo.id,
                        title: mockTodo.title,
                        completed: mockTodo.completed
                    }
                ]
            },
            findByPk: (id: number) => {
                return {
                    id: id,
                    title: mockTodo.title,
                    completed: mockTodo.completed
                }
            },
            create: (todo: TodoObject) => {
                mockTodo = todo;
                return {
                    id: todo.id,
                    title: todo.title,
                    completed: todo.completed
                }
            },
            destroy: (id: number) => {
                mockTodo = {
                    id: 0,
                    title: "",
                    completed: false
                }
                return [
                    {
                        id: id,
                        title: "Test description",
                        completed: false
                    }
                ]
            }
        }
    }
})

test("If a task is added to the list then it should be in the list", async () => {

    const todoService: ITodoService = new TodoDBService();
    const todoObj: TodoObject = {
        id: 0,
        title: "Test description",
        completed: false
    }
    const newId:number = await todoService.addTodos(todoObj);
    todoObj.id = newId;
    const todo = await todoService.getTodos();


    console.log("todod " + todo[0].id)
    console.log("todoObj " + todoObj.id) 
    expect(todo.some((todo) => todo.id == todoObj.id)).toBeTruthy();
})

// ------------------------ Notes ------------------------
jest.mock('../db/note.db', () => {
    let mockNote: Note = {
        id: 0,
        title: "Test description",
        preview: "Test preview",
        todoIds: [1, 2, 3],
        fileID: 0
    }

    return {
        NoteModel: {
            findAll: () => {
                return [
                    {
                        id: mockNote.id,
                        title: mockNote.title,
                        preview: mockNote.preview,
                        todoIds: mockNote.todoIds,
                        fileID: mockNote.fileID
                    }
                ]
            },
            findByPk: (id: number) => {
                return {
                    id: id,
                    title: mockNote.title,
                    preview: mockNote.preview,
                    todoIds: mockNote.todoIds,
                    fileID: mockNote.fileID
                }
            },
            create: (note: Note) => {
                mockNote = note;
                return {
                    id: note.id,
                    title: note.title,
                    preview: note.preview,
                    todoIds: note.todoIds,
                    fileID: note.fileID
                }
            },
            destroy: (id: number) => {
                mockNote = {
                    id: 0,
                    title: "",
                    preview: "",
                    todoIds: [],
                    fileID: 0
                }
                return [
                    {
                        id: id,
                        title: "Test description",
                        preview: "Test preview",
                        todoIds: [1, 2, 3],
                        fileID: 0
                    }
                ]
            }
        }
    }
})

test("If a note is created then it should be in the list", async () => {
    const noteService: INoteService = new NoteServiceWithDb();

    await noteService.createNote("testNote", 3, [1, 2, 3]);
    const notes: Note[] = await noteService.getNotes();

    expect(notes.length == 1);
    expect(notes[0].title == "testNote").toBeTruthy();
})



// mock PomodoroModel
jest.mock('../db/pomodoroObject.db', () => {
    let mockPomodoro: PomodoroObject = {
        id: 0,
        startTime: Date.now(),
        endTime: Date.now(),
        duration: 0
    }

    return {
        PomodoroModel: {
            findAll: () => {
                return [
                    {
                        id: mockPomodoro.id,
                        startTime: mockPomodoro.startTime,
                        endTime: mockPomodoro.endTime,
                        duration: mockPomodoro.duration
                    }
                ]
            },
            findByPk: (id: number) => {
                return {
                    id: id,
                    startTime: mockPomodoro.startTime,
                    endTime: mockPomodoro.endTime,
                    duration: mockPomodoro.duration
                }
            },
            create: (pomodoro: PomodoroObject) => {
                mockPomodoro = pomodoro;
                return {
                    id: pomodoro.id,
                    startTime: pomodoro.startTime,
                    endTime: pomodoro.endTime,
                    duration: pomodoro.duration
                }
            },
            destroy: (id: number) => {
                mockPomodoro = {
                    id: 0,
                    startTime: Date.now(),
                    endTime: Date.now(),
                    duration: 0
                }
                return [
                    {
                        id: id,
                        startTime: Date.now(),
                        endTime: Date.now(),
                        duration: 0
                    }
                ]
            }
        }
    }
}
)

// ------------------------ Pomodoro ------------------------

test("If a timer session is created then it should be in the list", async () => {
    const testPomodoro: PomodoroObject = {
        id: 0,
        startTime: Date.now(),
        endTime: Date.now(),
        duration: 0
    }
    const pomodoroService:IPomodoroService = new PomodoroServiceWithDb
    await pomodoroService.initPomodoroSession(testPomodoro);
    const pomodoroIds: PomodoroObject[] = await pomodoroService.getPomodoroSessions();

    expect(pomodoroIds.length == 1);
    expect(pomodoroIds[0].id == 0).toBeTruthy();
})



test("If a pomodoro session is deleted then it should be removed from the list", async () => {
    const testPomodoro: PomodoroObject = {
        id: 0,
        startTime: Date.now(),
        endTime: Date.now(),
        duration: 0
    }
    const pomodoroService = new PomodoroServiceWithDb();

    await pomodoroService.initPomodoroSession(testPomodoro);
    const pomodoroIds: PomodoroObject[] = await pomodoroService.getPomodoroSessions();
    const id = pomodoroIds[0].id;

    await pomodoroService.deletePomodoroSession(id);
    const pomodoroIds2: PomodoroObject[] = await pomodoroService.getPomodoroSessions();

    expect(pomodoroIds2.length == 0);
})

test("If the list of pomodoro sessions are empty then you should get an error code for trying to delet an object", async () => {
    const testPomodoro: PomodoroObject = {
        id: 0,
        startTime: Date.now(),
        endTime: Date.now(),
        duration: 0
    }
    const pomodoroService = new PomodoroServiceWithDb();

    try {
        await pomodoroService.deletePomodoroSession(0);
    } catch (error: any) {
        expect(error.message == 'Pomodoro session not found');
        expect(error.code == 404);
    }
}
)