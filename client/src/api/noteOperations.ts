import { AxiosResponse } from 'axios';
import { NoteData } from '../types/NoteData';
import axiosInstance from './axiosInstance';


export async function deleteNote(props: NoteData) {
    await axiosInstance.delete('/note/' + props.id);

    const note = document.getElementById(props.id);
    if (note) {
        note.remove();
    }


    // delete it from the user as well
    await axiosInstance.delete('/user/notes/' + props.id);

    console.log('note deleted from user');
}



export async function addNote(title: string, todos: string[], fileId: number | null) {
   
    const localNoteId = await uploadNote(title, todos, fileId);
    await linkNoteToUser(localNoteId);

}

async function linkNoteToUser(localNoteId: string) {
    console.log("local note id" + localNoteId);
    // add note to the user
    const responseUser: AxiosResponse = await axiosInstance.post('/user/notes',
        { noteId: localNoteId }
    );
    console.log(responseUser);
    alert('Note added');

    window.location.reload();
}

async function uploadNote(title: string, todos: string[], fileId: number| null): Promise<string> {

    try {
        const response: AxiosResponse = await axiosInstance.post('/note', {
            title: title,
            content: todos,
            fileId: fileId
        });
        const localNoteId:string = response.data.id;
        return localNoteId;

     
    } catch (error) {

        console.error(error);
        alert('Error adding note');
        return '';
    }

}

export async function uploadFile(formData: FormData, fileIdLocal: number | null) {
    const response = await axiosInstance.post('/file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    fileIdLocal = response.data.message;
    return fileIdLocal;
}

export async function getNotes() {
    return await axiosInstance.get('/note');
  }
  
  
