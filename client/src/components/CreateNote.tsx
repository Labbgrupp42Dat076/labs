// import bootstrap card
import Card from 'react-bootstrap/Card';
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useState, FormEvent, useRef } from 'react';



export function AddNoteOverlay() {

    const [fileId, setFileId] = useState<string | null>(null)


    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    return (
        <Card className="add-note-overlay m-5">
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" required/>


                    <Form.Select aria-label="Todo Selector">

                        {/* todo make this linked to todos */}
                        <option>Select Todos to link</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Control id="main-submit" className="hidden" type="submit" value="Add Note!" />
            </Form>
            <Form onSubmit={
                (e) => {
                    handleSubmit(e)
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
