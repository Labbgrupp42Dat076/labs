import {Note} from '../model/note'

import { ErrorMessage } from '../../utilities/error_message';
import { INoteService } from './noteInterface';

import { IFileService } from './interfaceFile';

import fileService from './file';



export class NoteService implements INoteService {
    private notes : Note[] = [

    ]

    fileService : IFileService = fileService

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



        }
        catch (error) {
            throw new ErrorMessage("Notes not found", 404);
        }

    }

    public async getNotes() : Promise<Note[]> {
        return this.notes;
    }

    async createNote(title : string, fileID : string, todoIds: number[]) : Promise<number> {
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
            todoIds : todoIds
        }

        this.notes.push(Note);
        console.log(this.notes);
        this.updateNotes(Note);
        return Note.id;
    

    }


    private async getPreview(fileID: string): Promise<string> {
        try {
            const ret: string = await this.fileService.readFile(fileID)
            return ret.substring(0, 100);
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
            this.fileService.deleteFile(fileID);
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

