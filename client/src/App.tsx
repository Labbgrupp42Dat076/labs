import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import TodoPage from './TodoPage/TodoPage'

import { Notes } from './pages/Notes'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Notes></Notes>
    </>
  )
}

export default App
