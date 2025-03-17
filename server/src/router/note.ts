/**
 * @swagger
 * /note:
 *   get:
 *     summary: Get all notes for authenticated user
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized
 *      404:
 *          description: Notes not found
 *   post:
 *     summary: Create a new note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               fileId:
 *                 type: string
 *               content:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Note created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: string
 *      404:
 *       description: the file you tried to link to the note does not exist
 * 
 * /note/{id}:
 *   delete:
 *     summary: Delete a note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Note deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     404: 
 *          description: Note not found
 */

import express, { Request, Response } from "express";

import { INoteService } from "../service/interface/noteInterface";
import {NoteService } from "../service/old/note";
import { NoteServiceWithDb } from "../service/noteWithDb";
import { Note } from "../model/note";

import { ErrorMessage } from "../../utilities/error_message";
import { check_session } from "../../utilities/session_checker";
import { User } from "../model/user";

const noteRouter = express.Router();
const noteService: INoteService = new NoteServiceWithDb();

// get all notes from a list of ids

noteRouter.get("/", async (req: Request, res: Response) => {
    try {

        const response: User = await  check_session(req)  
    

        let notes: Note[] = []
        const noteIds = response.noteIds
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


        const id = await noteService.createNote(req.body.title, req.body.fileId, req.body.content, );
            res.status(200).json({ message: 'Note created', id:  id });
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
        ErrorMessage.setResponseToErrorMessage(error, res);

    }
});



export default noteRouter;




