import {Note} from '../model/note'
import FileService from './file';

export class NoteService {
    private notes : Note[] = []

    private getNotesFromID(id : number) : Note {
        return JSON.parse(JSON.stringify(this.notes.find(note => note.id === id)));
    }

    public async getNotesByListOfIDs(ids : number[]) : Promise<Note[]> {
        return this.notes.filter(note => ids.includes(note.id));
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


    private async getPreview(fileID : string) : Promise<string> {
        const fileContent: string = FileService.readFile(fileID);
        return fileContent.substring(0, 100);
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

    private async deleteLinkedFile(fileID : string) : Promise<boolean> {
        //delete the file with the fileID
        return FileService.deleteFile(fileID);
    }

    private async updateNotes(note : Note) : Promise<Note[]> {
        this.notes = this.notes.map( (item) => {
            return this.getNotesFromID(note.id) === item ? note : item;
        });

        return this.notes;
    }
}

