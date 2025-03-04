import { Note } from '../model/note'

import { ErrorMessage } from '../../utilities/error_message';
import { INoteService } from './noteInterface';
import { NoteModel } from '../db/note.db';

import { IFileService } from './interfaceFile';

import fileServiceDbInt from './fileServiceDbInt';



export class NoteServiceWithDb implements INoteService {


    fileService: IFileService = fileServiceDbInt

    private async getNotesFromID(id: number): Promise<Note> {


        try {
            if (await NoteModel.findByPk(id) === null) {
                throw new ErrorMessage("Note not found", 404);
            }
            return JSON.parse(JSON.stringify(await NoteModel.findByPk(id)));
        } catch (error) {
            throw new ErrorMessage("Note not found", 404);
        }

    }

    public async getNotesByListOfIDs(ids: number[]): Promise<Note[]> {

        try {

            const notes: Note[] = await NoteModel.findAll();
            return notes.filter(note => ids.includes(note.id));




        }
        catch (error) {
            throw new ErrorMessage("Notes not found", 404);
        }

    }

    public async getNotes(): Promise<Note[]> {
        return await NoteModel.findAll();
    }

    async createNote(title: string, fileID: number, todoIds: number[]): Promise<number> {
        let preview: string;

        try {
            //maybe validate the fileID here as well
            preview = await this.getPreview(fileID);

        } catch (error) {
            throw new ErrorMessage("File not found", 404);
        }

        const Note = {
            title: title,
            preview: preview,
            fileID: fileID,
            id: Math.floor(Date.now() / 1000),
            todoIds: todoIds
        }

        NoteModel.create(Note);

        return Note.id;


    }


    private async getPreview(fileID: number): Promise<string> {
        try {
            const ret = await this.fileService.readFile(fileID)
            return ret.substring(0, 100);
        } catch (error) {
            return "No preview available"; // Default preview
        }
    }

    async deleteNoteByID(id: number): Promise<boolean> {
        //delete the note with the id
        //delete the linked file
        if (await NoteModel.findByPk(id)) {
            const note: Note = await this.getNotesFromID(id);
            this.deleteLinkedFile(note.fileID);
            await NoteModel.destroy({
                where: {
                    id: id
                }
            });

            return true;
        } else {
            throw new ErrorMessage("Note not found", 404);
        }
    }

    private async deleteLinkedFile(fileID: number): Promise<boolean> {
        //delete the file with the fileID

        try {
            this.fileService.deleteFile(fileID);
            return true;
        } catch (error) {
            return false;
        }

    }


}

