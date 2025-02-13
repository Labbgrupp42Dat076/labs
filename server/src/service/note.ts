import {Note} from '../model/note'
import fileService from './file';

export class NoteService {
    private notes : Note[] = []

    private getNotesFromID(id : number) : Note {
        return JSON.parse(JSON.stringify(this.notes.find(note => note.id === id)));
    }

    public async getNotesByListOfIDs(ids : number[]) : Promise<Note[]> {
        return this.notes.filter(note => ids.includes(note.id));
    }

    public async getNotes() : Promise<Note[]> {
        return this.notes;
    }

    async createNote(title : string, fileID : string) : Promise<number> {
        let preview = await this.getPreview(fileID);

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
            throw new Error('Note not found');
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