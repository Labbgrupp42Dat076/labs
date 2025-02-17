import { useState } from 'react'
import { useEffect } from 'react';
// import for requests
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import './notes.css'
import { Note } from '../components/Note'

export function Notes() {
  const [notes, setNotes] = useState([])


  //initial fetch of notes
  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:8080/note')
    console.log(response.data)
    setNotes(response.data)
  }

    useEffect(() => {
        fetchNotes()
    }, [])


  return (
    <div className='notes_body'>

      <section className="notes">
        {

        notes.map((note: any) => {

            return <Note name={note.title} content={note.preview} key={note.id} id={note.id} />

        })

        }   
       
        </section>
    
        <Button className='add_notes' onClick={() => {/* add notes appears*/}} variant="primary">Add Note</Button>


    </div>
  )
}


