import {Note} from '../model/note'

export class NoteService {
    private notes : Note[] = []

    async getNotesUser(user : User) : Promise<Note[]> {
        return this.notes.map(note => ({...note}));
    }

    async getNotesFromID(id : number) {
        return JSON.parse(JSON.stringify(this.notes.find(note => note.id === id)));
    }

    async createNote(title : string, fileID : string) : Promise<Note> {
        //from fileID, get a .txt file and extract the first 100 characters as preview
        let preview = await this.getPreview(fileID);

        const Note = {
            title : title,
            preview : preview,
            fileID : fileID,
            id : Date.now()
        }

        this.notes.push(Note);
        return {... Note}
    }


    private async getPreview(fileID : string) : Promise<string> {
        //get the file from the fileID
        //extract the first 100 characters
        return "preview";
    }
}