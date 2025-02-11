import * as SuperTest from "supertest";
import { app } from "../start";
import { TodoObject } from "../model/todoObject";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
    const title = "Test title";
    
    const res1 = await request.post("/todo").send({title : title});
    expect(res1.statusCode).toEqual(200);

    const res2 = await request.get("/todo");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((todoObject : TodoObject) => todoObject.title)).toContain(title);
});