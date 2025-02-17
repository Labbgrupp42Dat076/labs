import {Note} from '../model/note'
import fileService from './file';
import { ErrorMessage } from '../../utilities/error_message';

export class NoteService {
    private notes : Note[] = [

        {
            title : "Note 1",
            preview : "This is the first note lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            fileID : "1",
            id : 1,
            todoIds : [1,2]
        },
        {
            title : "Note 2",
            preview : "This is the second note",
            fileID : "2",
            id : 2,
            todoIds : [3,4]
        },
        {
            title : "Note 3",
            preview : "This is the third note",
            fileID : "3",
            id : 3,
            todoIds : [5,6]
        },
        {
            title : "Note 4",
            preview : "This is the fourth note",
            fileID : "4",
            id : 4,
            todoIds : [7,8]
        },
        {
            title : "Note 5",
            preview : "This is the fifth note",
            fileID : "5",
            id : 5,
            todoIds : [9,10]
        }
    ]

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
            if (await this.deleteLinkedFile(note.fileID)){}else
            {
                throw new ErrorMessage("File not found", 404);
            }

            
        
        
            this.notes = this.notes.filter(note => note.id !== id);
            try{
                this.updateNotes(note);
            }catch (error) {
                throw new ErrorMessage("Note not found", 404);
            }
       
            return true;
        }
        else {
            throw new ErrorMessage("Note not found", 404);
        }
    }

    private async deleteLinkedFile(fileID : string) : Promise<boolean> {
        //delete the file with the fileID

        try {
            fileService.deleteFile(fileID);
            return true;
        } catch (error) {
            return false;
        }

    }

    private async updateNotes(note : Note) : Promise<Note[]> {
     
        this.notes = this.notes.map( (item) => {
   
            try {
                return this.getNotesFromID(note.id) === item ? note : item;
            } catch (SyntaxError) {
                // catches to prevent the function from throwing an error if the note is not found
                return item;
            }
           
        });
  

        return this.notes;
    }
}

const noteService = new NoteService();

export default noteService;