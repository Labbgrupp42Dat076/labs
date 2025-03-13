import { useState } from 'react'
import { useEffect } from 'react';
// import for requests
import { getNotes } from '../../api/noteOperations'
import Button from 'react-bootstrap/Button';
import './notes.css'
import { Note } from '../../components/Note'
import { AddNoteOverlay } from '../../components/CreateNote'


export function Notes() {
  const [notes, setNotes] = useState([])


  //initial fetch of notes
  const fetchNotes = async () => {
    const response = await getNotes()
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

        notes.map((note: {
            title: string,
            preview: string,
            id: string,
            todoIds: string[],
            fileID: number
        }) => { 

            return <Note name={note.title} content={note.preview} key={note.id} id={note.id} connectedTodos={note.todoIds} fileID={note.fileID}/>

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


