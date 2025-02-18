import express, { Request, Response } from "express";

import noteService from "../service/note";
import { Note } from "../model/note";

import { ErrorMessage } from "../../utilities/error_message";
import { check_session } from "../../utilities/session_checker";

const noteRouter = express.Router();

// get all notes from a list of ids

noteRouter.get("/", async (req: Request, res: Response) => {
    try {

        check_session(req)  
        let notes: Note[] = []
        const noteIds = await req.session.user?.noteIds 
        if (noteIds) {
          notes = await noteService.getNotesByListOfIDs(noteIds)
        }

        res.status(200).json(notes);
    } catch (error: unknown) {
        ErrorMessage.setResponseToErrorMessage(error, res);
    }
});

// create a note
noteRouter.post("/", async (req: Request, res: Response) => {
    try {

        // reformat from string to number
        req.body.content.forEach((element: string) => {
            if (element === undefined) {
                return;
            }
            parseInt(element);
        }
        );


        const id = await noteService.createNote(req.body.title, req.body.fileId, req.body.content);
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
    } catch (error) {
        console.log("hello");
        ErrorMessage.setResponseToErrorMessage(error, res);

    }
});


export default noteRouter;




