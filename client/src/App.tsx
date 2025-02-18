import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import TodoPage from './TodoPage/TodoPage'
import axios from 'axios'
import { Notes } from './pages/Notes'
axios.defaults.withCredentials = true;


function App() {
  const [count, setCount] = useState(0)

  async function login() {
    //logs you in for now
    await axios.post('http://localhost:8080/user/login', {
      name: 'admin',
      password: 'admin'
    })
  }


  useEffect(() => {
    login()
  }, [])

  return (
    <>

      <TodoPage></TodoPage>
    </>
  )
}

export default App
