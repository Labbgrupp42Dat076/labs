import express from "express";
import cors from 'cors';
import todoRouter from "./router/todo";
import noteRouter from "./router/note";
import userRouter from "./router/user";
import fileRouter from "./router/file";
import session from 'express-session';
import dotenv from 'dotenv';

export const app = express();

dotenv.config();
if (! process.env.SESSION_SECRET) {
  
  console.log("Could not find SESSION_SECRET in .env file");
  process.exit();
}

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
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

