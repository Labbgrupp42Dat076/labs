
import { Button } from 'react-bootstrap';
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <Button variant='danger'>Delete</Button>
            </div>
        </div>
    )
}