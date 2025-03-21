import {Note} from '../../model/note'



export interface INoteService {


    getNotesByListOfIDs(ids : number[]) : Promise<Note[]> 

    getNotes() : Promise<Note[]> 

    createNote(title : string, fileID : number, todoIds: number[]) : Promise<number> 

    deleteNoteByID(id : number) : Promise<boolean> 


}