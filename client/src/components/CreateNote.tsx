// import bootstrap card
import Card from 'react-bootstrap/Card';
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useRef } from 'react';

interface NoteData {
    name: string;
    fileID: string;
    id: string;
}

export function AddNoteOverlay() {
    const fileUpload = async (e: any) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        const response = await axios.post('http://localhost:8080/file', formData)
        console.log(response)
    }

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if(fileInputRef.current && fileInputRef.current.files) {
            const file = fileInputRef.current.files[0]
            const formData = new FormData()
            formData.append('file', file)
            try {
                const response = await axios.post('http://localhost:8080/file', formData)
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <Card className="add-note-overlay m-5">

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" />

                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
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
