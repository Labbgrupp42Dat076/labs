import express, { Request, Response } from "express";

import noteService from "../service/note";
import { Note } from "../model/note";


const noteRouter = express.Router();

// get all notes from a list of ids

noteRouter.get("/", async (req: Request, res: Response) => {
    try {
        const notes = await noteService.getNotesByListOfIDs(req.body.ids);
        res.status(200).json(notes);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(404).json({ message: errorMessage });
    }
});

// create a note
noteRouter.post("/", async (req: Request, res: Response) => {
    try {
        const id = await noteService.createNote(req.body.title, req.body.fileID);
        res.status(200).json({ message: 'Note created' + id });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(404).json({ message: errorMessage });
    }
});

// delete a note
noteRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        await noteService.deleteNoteByID(parseInt(req.params.id));
        res.status(200).json({ message: 'Note deleted' });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(404).json({ message: errorMessage });
    }
});


export default noteRouter;




