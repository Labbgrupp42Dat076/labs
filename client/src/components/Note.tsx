
import { Button } from 'react-bootstrap';
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import { NoteData } from '../types/NoteData';
import { deleteNote, downloadFile} from '../api/noteOperations';
import { useEffect, useState} from 'react';
import { requestAllTodos } from '../api/todoOperations';
import { TodoData } from '../api/todoOperations';

export function Note(props: NoteData) {

    const [todos, setTodos] = useState<TodoData[]>([])

    async function fetchTodos() {
        // fetch the todos from the server
        const localtodos = await requestAllTodos()
        setTodos(localtodos)
        console.log(localtodos)
    }

    useEffect(() => {
        fetchTodos()
    }, [])
    return (
        <div className='note' id ={props.id}>
            <h2>{props.name}</h2>
            <p>{props.content}</p>
            <div>
                {props.connectedTodos.map((todo) => {
                    const todoObject = todos.find((todoObject) => todoObject.id.toString() == todo)
                    console.log(todoObject)
                    if (todoObject) {
                        return <div key={todo}>{todoObject.title }</div>
                    } else {
                        return <div key={todo}>{todo}</div>
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
                <Button variant='primary'>Edit</Button>
                <Button variant='primary' onClick={async () =>{
                    await downloadFile(props.fileID)
                }}>Download</Button>
                <Button variant='danger'
                onClick={async () => {
                        
  
                    
                }}
                >Delete</Button>
            </div>
        </div>
    )
}


