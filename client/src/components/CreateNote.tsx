// import bootstrap card
import Card from 'react-bootstrap/Card';
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

import { useState, FormEvent, useRef, useEffect} from 'react';
import { FormCheckType } from 'react-bootstrap/esm/FormCheck';

import {requestAllTodos} from '../api/todoOperations';
import { TodoData } from '../api/todoOperations';


import { addNote, uploadFile } from '../api/noteOperations';


/**
 * Component that provides an overlay for adding a new note.
 * 
 * @component
 * @example
 * return (
 *   <AddNoteOverlay />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @remarks
 * This component allows users to create a new note by providing a title, linking existing todos, and optionally uploading a file.
 * 
 * @description
 * The `AddNoteOverlay` component fetches todos from the server and displays them as checkboxes. Users can select todos to link to the new note. 
 * Additionally, users can upload a file which will be associated with the note. The component handles form submissions for both the note and the file.
 */
export function AddNoteOverlay() {

    const [fileId, setFileId] = useState<number| null>(null)
    const [todos, setTodos] = useState<TodoData[]>([])
    async function fetchTodos() {
        // fetch the todos from the server
        const localtodos = await requestAllTodos()
        setTodos(localtodos)
        
        
    }

    useEffect(() => {
        // fetch the todos from the server
        fetchTodos()
    }, [])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmitFile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let fileIdLocal: number | null = null
        if (fileInputRef.current && fileInputRef.current.files) {
            const file = fileInputRef.current.files[0]
            if (!file) {
                return alert('No file selected')
            }
            const formData = new FormData()
// check file type we allo .tex files

            if (!file.type.includes('image') && !file.type.includes('pdf') && !file.type.includes('text') && !file.type.includes('text/plain') && !file.type.includes('application/pdf') && file.type !== 'application/x-tex' && !file.name.includes('.tex')) {
                return alert(file.type+ ' is not a supported file type')
            }

            formData.append('file', file)

            try {
                fileIdLocal = await uploadFile(formData, fileIdLocal);
                await setFileId(fileIdLocal)

                const submitButton = document.getElementById('main-submit')
                if (submitButton) {
                    submitButton.classList.toggle('hidden')
                }
            } catch (error) {
                console.error(error)
            }
            setFileId(fileIdLocal)
        }
    }

    const handleSubmitNote = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const titleElement = document.getElementById('title');
        const title: string = titleElement ? (titleElement as HTMLInputElement).value : '';
        if (!title) {
            alert('Title is required')
        }

        const todoIdsElement: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type=checkbox]')

        const todosToNotes: string[] = []
        todoIdsElement.forEach((todo) => {
            if (todo.checked) {
                if (todo.labels && todo.labels[0]) {
                    todosToNotes.push(todo.id.split('-')[1])
                }
            }
        })



        await addNote(title, todosToNotes, fileId);


    }

    return (
        <Card className="add-note-overlay m-5">
            <Form onSubmit={handleSubmitNote}>
                <Form.Group className="mb-3">
                    <Form.Label>Create note</Form.Label>
                    <Form.Control type="text" placeholder="Title" required id="title" />
                </Form.Group>
                <Form.Group>
                    <Form.Label id="list of todos">Linked Todos</Form.Label>

                    <div key={`inline-checkbox`} className="mb-3">
                        {
                            todos.map((i) => {
                                return (
                                    <Form.Check
                                        key={i.id}
                                        type={'checkbox' as FormCheckType}
                                        id={`checkbox-${i.id}`}
                                        label={`${i.title}`}
                                    />
                                )
                            })
                        }
                    </div>
                </Form.Group>


                <Form.Control id="main-submit" className="hidden" type="submit" value="Add Note!" />
            </Form>
            <Form onSubmit={
                (e) => {
                    handleSubmitFile(e)
                }
            }>
                <Form.Group controlId="formFile" className="mb-3" >

                    <Form.Label>Upload file</Form.Label>
                    <Form.Control type="file" ref={fileInputRef} />


                </Form.Group>
                <Form.Control type="submit" value="upload file" />
            </Form>

        </Card>
    )
}

