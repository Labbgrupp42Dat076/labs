import {AxiosResponse } from 'axios';
import { NoteData } from '../types/NoteData';
import axiosInstance from './axiosInstance';

/**
 * Deletes a note from the server and removes it from the DOM.
 * 
 * @param props - The data of the note to be deleted.
 * @param props.id - The unique identifier of the note.
 * 
 * @returns A promise that resolves when the note has been deleted.
 * 
 * @remarks
 * This function performs the following steps:
 * 1. Sends a DELETE request to the server to delete the note.
 * 2. Removes the note element from the DOM if it exists.
 * 3. Sends a DELETE request to the server to delete the note from the user's notes.
 * 4. Logs a message indicating that the note has been deleted from the user.
 */
export async function deleteNote(props: NoteData) {
    await axiosInstance.delete('/note/' + props.id);

    const note = document.getElementById(props.id);
    if (note) note.remove();

    // delete it from the user as well
    await axiosInstance.delete('/user/notes/' + props.id);
}



/**
 * Adds a new note by uploading it and linking it to the user.
 *
 * @param title - The title of the note.
 * @param todos - An array of todo items associated with the note.
 * @param fileId - The ID of the file associated with the note, or null if there is no file.
 * @returns A promise that resolves when the note has been added and linked to the user.
 */
export async function addNote(title: string, todos: string[], fileId: number | null) {
    const localNoteId = await uploadNote(title, todos, fileId);
    await linkNoteToUser(localNoteId);
}


/**
 * Links a note to a user by sending a POST request to the server.
 * 
 * @param {string} localNoteId - The ID of the local note to be linked to the user.
 * @returns {Promise<void>} - A promise that resolves when the note has been successfully linked to the user.
 * 
 * @throws {Error} - Throws an error if the request fails.
 * 
 * @remarks
 * This function sends a POST request to the endpoint '/user/notes' with the note ID.
 * On success, it logs the server response, shows an alert to the user, and reloads the window.
 */
async function linkNoteToUser(localNoteId: string): Promise<void> {
    const responseUser: AxiosResponse = await axiosInstance.post('/user/notes',
        { noteId: localNoteId }
    );
    console.log(responseUser);
    alert('Note added');

    window.location.reload();
}


/**
 * Uploads a note to the server.
 *
 * @param {string} title - The title of the note.
 * @param {string[]} todos - The content of the note as an array of strings.
 * @param {number | null} fileId - The ID of the file associated with the note, or null if there is no file.
 * @returns {Promise<string>} A promise that resolves to the ID of the uploaded note as a string.
 *
 * @throws Will throw an error if the note could not be uploaded.
 */

async function uploadNote(title: string, todos: string[], fileId: number | null): Promise<string> {


    try {
        const response: AxiosResponse = await axiosInstance.post('/note', {
            title: title,
            content: todos,
            fileId: fileId
        });
        const localNoteId: string = response.data.id;
        return localNoteId;

    } catch (error) {
        console.error(error);
        alert('Error adding note with error: \n' + error);
        return '';
    }
}

/**
 * Uploads a file to the server.
 *
 * @param {FormData} formData - The form data containing the file to be uploaded.
 * @param {number | null} fileIdLocal - The local file ID, which will be updated with the server response.
 * @returns {Promise<number | null>} - A promise that resolves to the updated file ID from the server response.
 */
export async function uploadFile(formData: FormData, fileIdLocal: number | null) {
    try {
        const response = await axiosInstance.post('/file', formData, {
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


/**
 * Fetches the list of notes from the server.
 *
 * @returns {Promise<AxiosResponse<any>>} A promise that resolves to the response of the GET request to the notes endpoint.
 */
export async function getNotes(): Promise<AxiosResponse<NoteData[]>> {
    // eslint-disable-next-line no-useless-catch
    try{
        return await axiosInstance.get('/note');
    }catch(error){
        throw error;
    }
}

 
/* Downloads a file from the server.
*
* @param {number} fileId - The ID of the file to be downloaded.
* @returns {Promise<void>} - A promise that resolves when the file has been successfully downloaded.
*
* @throws {Error} - Throws an error if the request fails.
*
* @remarks
* This function performs the following steps:
* 1. Sends a GET request to the server to download the file as a blob.
* 2. Creates a URL for the blob and triggers a download in the browser.
* 3. Revokes the object URL to free up memory.
*/
export async function downloadFile(fileId: number){
    try{
        const response = await axiosInstance.get('/file/download/' + fileId, {
            responseType: 'blob'
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });


        const url = window.URL.createObjectURL(blob);
        // call the backend directly to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file';
        a.click();
    }catch(error){
        alert('Error downloading file ' + error);
    }
  }
