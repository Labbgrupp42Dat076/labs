import axios, { AxiosResponse } from 'axios';
import { NoteData } from '../types/NoteData';
axios.defaults.withCredentials = true;
export async function deleteNote(props: NoteData) {
    await axios.delete('http://localhost:8080/note/' + props.id);

    const note = document.getElementById(props.id);
    if (note) {
        note.remove();
    }


    // delete it from the user as well
    await axios.delete('http://localhost:8080/user/notes/' + props.id);

    console.log('note deleted from user');
}



export async function addNote(title: string, todos: string[], fileId: number | null) {

    const localNoteId = await uploadNote(title, todos, fileId);
    await linkNoteToUser(localNoteId);

}

async function linkNoteToUser(localNoteId: string) {
    console.log("local note id" + localNoteId);
    // add note to the user
    const responseUser: AxiosResponse = await axios.post('http://localhost:8080/user/notes',
        { noteId: localNoteId }
    );
    console.log(responseUser);
    alert('Note added');

    window.location.reload();
}

async function uploadNote(title: string, todos: string[], fileId: number | null): Promise<string> {

    try {
        const response: AxiosResponse = await axios.post('http://localhost:8080/note', {
            title: title,
            content: todos,
            fileId: fileId
        });
        const localNoteId: string = response.data.id;
        return localNoteId;


    } catch (error) {

        console.error(error);
        alert('Error adding note');
        return '';
    }

}

export async function uploadFile(formData: FormData, fileIdLocal: number | null) {
    try {
        const response = await axios.post('http://localhost:8080/file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        fileIdLocal = response.data.message;
        console.log(response.status);
        if (response.status != 200) {
            alert('Error uploading file');
        }
        return fileIdLocal;
    } catch (error) {
        console.error(error);
        alert('Error uploading file');
        throw error;
    }
}

export async function getNotes() {
    return await axios.get('http://localhost:8080/note');



  }
  
export async function downloadFile(fileId: number){
    try{
  

        // call the backend directly to download the file
        const url = 'http://localhost:8080/file/download/' + fileId;
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file';
        a.click();
    }catch(error){
        alert('Error downloading file ' + error);
    }

    

  }

  
