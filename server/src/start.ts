import express from "express";
import todoRouter from "./router/todo";
import noteRouter from "./router/note";
import userRouter from "./router/user";
import fileRouter from "./router/file";

export const app = express();

app.use(express.json());

app.use("/todo", todoRouter);
app.use("/note", noteRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);

