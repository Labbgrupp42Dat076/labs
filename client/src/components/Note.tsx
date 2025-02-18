
import { Button } from 'react-bootstrap';
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
interface NoteData {
    name: string;
    content: string;
    id: string;
}


export function Note(props: NoteData) {
    return (
        <div className='note' id ={props.id}>
            <h2>{props.name}</h2>
            <p>{props.content}</p>
            <div>
                something for the todo list
            </div>

            <div className='action_buttons  shadow-sm bg-white rounded'>
                <Button variant="primary" onClick={
                    () => {
                        const note = document.getElementById(props.id)
                    
                        if (note) {
                            note.classList.toggle('expanded')
                        }
                    }
                } >Expand</Button>
                <Button variant='primary'>Edit</Button>
                <Button variant='primary'>Download</Button>
                <Button variant='danger'
                onClick={() => {
                    axios.delete('http://localhost:8080/note/' + props.id)
                    .then(() => {
                        const note = document.getElementById(props.id)
                        if (note) {
                            note.remove()
                        }
                    })

                    // delete it from the user as well
                    axios.delete('http://localhost:8080/user/notes/' + props.id)
                    .then(() => {
                        console.log('note deleted from user')
                    })
                    
                }}
                >Delete</Button>
            </div>
        </div>
    )
}