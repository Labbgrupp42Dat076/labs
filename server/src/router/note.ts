import express, { Request, Response } from "express";

import noteService from "../service/note";
import { Note } from "../model/note";

import { ErrorMessage } from "../../utilities/error_message";


const noteRouter = express.Router();

// get all notes from a list of ids

noteRouter.get("/", async (req: Request, res: Response) => {
    try {

        const ids = [1,2,3,4,5] // for testing
        const notes = await noteService.getNotesByListOfIDs(ids);
        res.status(200).json(notes);
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

// create a note
noteRouter.post("/", async (req: Request, res: Response) => {
    try {
        const id = await noteService.createNote(req.body.title, req.body.fileID);
        res.status(200).json({ message: 'Note created' + id });
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

// delete a note
noteRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        await noteService.deleteNoteByID(parseInt(req.params.id));
        res.status(200).json({ message: 'Note deleted' });
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});


export default noteRouter;




