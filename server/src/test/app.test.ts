import * as SuperTest from "supertest";
import { app } from "../start";
import { TodoObject } from "../model/todoObject";

const request = SuperTest.default(app);

const startTodoTitle = "Test title";

beforeAll(async () => {
    const res1 = await request.post("/todo").send({title : startTodoTitle});
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

