import * as SuperTest from "supertest";
import { app } from "../start";
import { TodoObject } from "../model/todoObject";
import { User } from "../model/user";
import { TodoModel } from "../db/todoObject.db";

// mock the check that the user is logged in with the method check session
const user: User = {
    id: 0,
    name: "admin",
    password: "admin",
    noteIds: [0],
    todoIds: [],
    pomodoroIds: [],
    lastPomodoroSession: 0
}
jest.mock("../../utilities/session_checker", () => ({
    check_session: jest.fn().mockImplementation(() => {
        return user;
    })
}));



// mock the TodoDBService
jest.mock("../service/todoDbService", () => {
    let todoMock = {
        id: 0,
        title: "Test description",
        completed: false
    }
    return {
        // mock todo
      
        TodoDBService: jest.fn().mockImplementation(() => {
            return {
                getTodos: jest.fn().mockImplementation(() => {
                    return [
                        todoMock
                    ]
                }),
                getTodo: jest.fn().mockImplementation((id: number) => {
                    return todoMock;
                }),
                getTodoById: jest.fn().mockImplementation((id: number) => {
                    return todoMock;
                }),
                getTodosByListOfIds: jest.fn().mockImplementation((ids: number[]) => {
                    return [
                        todoMock
                    ]
                }),
                addTodos: jest.fn().mockImplementation((todo: TodoObject) => {
                    todoMock = todo;
                    return 1;
                }),
                deleteTodos: jest.fn().mockImplementation((id: number) => {
                    return;
                })
            }
        })
    }
})



const request = SuperTest.default(app);

const startTodoTitle = "Test title";

beforeAll(async () => {
    const res1 = await request.post("/todo").send({title : startTodoTitle});
    // add the todo id to the user
    user.todoIds.push(res1.body.id);
});

test("Check that the get request works", async () => {
    const res2 = await request.get("/todo");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((todoObject : TodoObject) => todoObject.title)).toContain(startTodoTitle);
});

test("Check that todo item has been added after post", async () => {
    const title = "Test-1";

    const res1 = await request.post("/todo").send({title : title});
    expect(res1.statusCode).toEqual(200);
});

test("Check that todo item has been added after wrongful post", async () => {
    const title = "Test-1";

    const res1 = await request.post("/todo").send({notATitle: title});
    expect(res1.statusCode).toEqual(404);
});

