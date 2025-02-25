
import { Button } from 'react-bootstrap';
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import { NoteData } from '../types/NoteData';
import { deleteNote } from '../api/noteOperations';

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
                onClick={async () => {
                        await deleteNote(props);
  
                    
                }}
                >Delete</Button>
            </div>
        </div>
    )
}


