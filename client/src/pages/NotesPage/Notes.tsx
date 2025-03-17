import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
// import for requests
import { getNotes } from '../../api/noteOperations'
import Button from 'react-bootstrap/Button';
import './notes.css'
import { Note } from '../../components/Note'
import { AddNoteOverlay } from '../../components/CreateNote'
import { NoteData } from '../../types/NoteData';




/**
 * Notes component that fetches and displays a list of notes.
 * 
 * This component performs the following tasks:
 * - Fetches notes from an API on initial render using the `fetchNotes` function.
 * - Displays the notes in a list format.
 * - Provides an overlay to add new notes.
 * 
 * @component
 * @returns {JSX.Element} The rendered Notes component.
 * 
 * @example
 * <Notes />
 * 
 */
export function Notes(): JSX.Element {
  const [notes, setNotes] = useState<NoteData[]>([])
    const navigate = useNavigate()

  //initial fetch of notes

  const fetchNotes = async () => {
    const sampleNote: NoteData = {
        name: 'loading',
        content: '',
        id: '1',
        connectedTodos: [],
        fileID: 1
    }
    let response = {
        data: [ sampleNote ]
    }
    try{
        response = await getNotes()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error: any){
        console.log("look here " + error.response.status)
        // get the cat image from https://http.cat/
        navigate('/error/' + error.response.status)
        
    }
    console.log(response.data)
    setNotes(response.data)
  }

  useEffect(() => { 
      fetchNotes()

  }, [])


  return (
    <div className='notes_body'>

        <div id="overlay" className="hidden" >
            <div className="overlayToggler" onClick={
            () => {
                const overlay = document.getElementById('overlay')
                if (overlay) {
                    overlay.classList.toggle('hidden')
                }
            }
        }>

            </div>
            <AddNoteOverlay></AddNoteOverlay>
        </div>
      
      <section className="notes">
        {

        notes.map((note: NoteData) => { 
            return <Note name={note.name} content={note.content} key={note.id} id={note.id} connectedTodos={note.connectedTodos} fileID={note.fileID}/>
        })

        }   
       
        </section>
    
        <Button className='add_notes' onClick={() => {
            const overlay = document.getElementById('overlay')
            if (overlay) {
                overlay.classList.toggle('hidden')
            }
        }} variant="primary">Add Note</Button>


    </div>
  )
}


