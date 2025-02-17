import {Note} from '../model/note'
import fileService from './file';
import { ErrorMessage } from '../../utilities/error_message';


export class NoteService {
    private notes : Note[] = [

        {
            title: "test",
            preview:"test",
            id:0,
            fileID:"0",
            todoIds:[]
        }
    ]

    private getNotesFromID(id : number) : Note {

        try{
            
            return JSON.parse(JSON.stringify(this.notes.find(note => note.id === id)));
        } catch (error) {
            throw new ErrorMessage("Note not found", 404);
        }
    }

    public async getNotesByListOfIDs(ids : number[]) : Promise<Note[]> {

        try{
        
        return this.notes.filter(note => ids.includes(note.id));
        } catch (error) {
            throw new ErrorMessage("Note not found", 404);
        }
    }

    public async getNotes() : Promise<Note[]> {
        return this.notes;
    }

    async createNote(title : string, fileID : string) : Promise<number> {
        let preview : string;
        try {
            //maybe validate the fileID here as well
            preview = await this.getPreview(fileID);
        } catch (error) {
            throw new ErrorMessage("File not found", 404);
        }
        const Note = {
            title : title,
            preview : preview,
            fileID : fileID,
            id : Date.now(),
            todoIds : []
        }

        this.notes.push(Note);
        this.updateNotes(Note);
        return Note.id;
    

    }


    private async getPreview(fileID: string): Promise<string> {
        try {
            return fileService.readFile(fileID).substring(0, 100);
        } catch (error) {
            return "No preview available"; // Default preview
        }
    }

    async deleteNoteByID(id : number) : Promise<boolean> {
        //delete the note with the id
        //delete the linked file
        let note = this.notes.find(note => note.id === id);
        if (note) {
            this.deleteLinkedFile(note.fileID);
            this.notes = this.notes.filter(note => note.id !== id);
            this.updateNotes(note);
            return true;
        }
        else {
            throw new ErrorMessage("Note not found", 404);
        }
    }

    private async deleteLinkedFile(fileID : string) : Promise<void> {
        //delete the file with the fileID
        fileService.deleteFile(fileID);
    }

    private async updateNotes(note : Note) : Promise<Note[]> {
        this.notes = this.notes.map( (item) => {
            return this.getNotesFromID(note.id) === item ? note : item;
        });

        return this.notes;
    }
}

const noteService = new NoteService();

export default noteService;