// import bootstrap card
import Card from 'react-bootstrap/Card';
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useState, FormEvent, useRef } from 'react';
import { FormCheckType } from 'react-bootstrap/esm/FormCheck';



export function AddNoteOverlay() {

    const [fileId, setFileId] = useState<string | null>(null)
   


    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmitFile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let fileIdLocal: string | null = null
        if (fileInputRef.current && fileInputRef.current.files) {
            const file = fileInputRef.current.files[0]
            if (!file) {
                return alert('No file selected')
            }
            const formData = new FormData()
            formData.append('file', file)

            try {
                const response = await axios.post('http://localhost:8080/file', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                fileIdLocal = response.data.message
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
    
        const todos: string[] = []
        todoIdsElement.forEach((todo) => {
            if (todo.checked) {
                if (todo.labels && todo.labels[0]) {
                    todos.push(todo.labels[0].textContent || '');
                }
            }
        })



        let localNoteId
        await axios.post('http://localhost:8080/note', {
            title: title,
            content: todos,
            fileId: fileId
        }).then((response) => {
            console.log(response)
            localNoteId = response.data.id

        }).catch((error) => {
            console.error(error)
            alert('Error adding note')
        })


        console.log("local note id" + localNoteId)
        // add note to the user
        axios.post('http://localhost:8080/user/notes',
        { noteId: localNoteId }
        ).then((response) => {
            console.log(response)
            alert('Note added')

            window.location.reload()
        }).catch((error) => {
            console.error(error)
            // alert('Error linking note to user')
        }
        )


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
                        <Form.Check
                            inline
                            label="1"
                            name="group1"
                            type={'checkbox' as FormCheckType}
                            id={`inline-checkbox-1`}
                        />
                        <Form.Check
                            inline
                            label="2"
                            name="group1"
                            type={'checkbox' as FormCheckType}
                            id={`inline-checkbox-2`}
                        />
                        <Form.Check
                            inline

                            label="3"
                            type={'checkbox' as FormCheckType}
                            id={`inline-checkbox-3`}
                        />
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
