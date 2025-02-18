


import { useEffect} from 'react'

import './App.css'
import Pomodoro from './pomodoro'
import axios from 'axios'


import TodoPage from './TodoPage/TodoPage'

import { Notes } from './pages/Notes'


import {useRoutes} from 'react-router-dom'

axios.defaults.withCredentials = true;


const App = () => {
  
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
  const routes = useRoutes([
      { path: '/', element: <TodoPage /> },
      {path: '/pomodoro', element: <Pomodoro />},
      {path: '/todo', element: <TodoPage />},
      {path: '/notes', element: <Notes />}
  ]);

  return routes;
};




export default App
