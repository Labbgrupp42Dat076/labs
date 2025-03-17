
import { Button } from 'react-bootstrap';
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import { NoteData } from '../types/NoteData';
import { deleteNote, downloadFile} from '../api/noteOperations';
import { useEffect, useState} from 'react';
import { requestAllTodos } from '../api/todoOperations';
import { TodoData } from '../api/todoOperations';

/**
 * Represents a Note component that displays note details and associated todos.
 * 
 * @param {NoteData} props - The properties passed to the Note component.
 * @returns {JSX.Element} The rendered Note component.
 * 
 * @component
 * 
 * @example
 * <Note id="1" name="Sample Note" content="This is a sample note." connectedTodos={["1", "2"]} />
 * 
 **/ 
export function Note(props: NoteData): JSX.Element {
    const [todos, setTodos] = useState<TodoData[]>([])

    async function fetchTodos() {
        const localtodos = await requestAllTodos()
        if (localtodos === undefined) {
            return
        }
        setTodos(localtodos)
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <div className='note' id ={props.id}>
            <h2>{props.name}</h2>
            <p>{props.content}</p>
            <div>
                <h6>Linked todos</h6>
                {props.connectedTodos.map((todo) => {
                    const todoObject = todos.find((todoObject) => todoObject.id.toString() == todo)
                    console.log(todoObject)
                    if (todoObject) {
                        return <div key={todo}>{todoObject.title }</div>
                    } else {
                        return <div key={todo}>None</div>
                    }
                }
                )}
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
                <Button variant='primary' onClick={async () =>{
                    await downloadFile(props.fileID)
                }}>Download</Button>
                <Button variant='danger'
                onClick={async () => {
                        
  
                    await deleteNote(props)
                }}
                >Delete</Button>
            </div>
        </div>
    )
}
