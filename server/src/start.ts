import express from "express";
import cors from 'cors';
import todoRouter from "./router/todo";
import noteRouter from "./router/note";
import userRouter from "./router/user";
import fileRouter from "./router/file";
import session from 'express-session';


export const app = express();

app.use(express.json());
app.use(session({
    secret: 'secret', //TODO make this safe or something
    resave: false,
    saveUninitialized: true
}));
app.use(cors({
    origin: true,
    credentials: true
}));

app.use("/todo", todoRouter);
app.use("/note", noteRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);

