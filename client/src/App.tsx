import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import TodoPage from './TodoPage/TodoPage'
import axios from 'axios'
import { Notes } from './pages/Notes'
axios.defaults.withCredentials = true;


function App() {
  const [count, setCount] = useState(0)

  //logs you in for now
  axios.post('http://localhost:8080/user/login',{
    name: 'admin',
    password: 'admin'
  })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })

  return (
    <>

      <Notes></Notes>
    </>
  )
}

export default App
