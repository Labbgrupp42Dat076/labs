


import { useEffect} from 'react'

import './App.css'
import Pomodoro from './pomodoro'
import axios from 'axios'


import TodoPage from './pages/TodoPage/TodoPage'

import { Notes } from './pages/NotesPage/Notes'


import {useRoutes} from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'

axios.defaults.withCredentials = true;


const App = () => {
  


  const routes = useRoutes([
      { path: '/', element: <LoginPage /> },
      {path: '/pomodoro', element: <Pomodoro />},
      {path: '/todo', element: <TodoPage />},
      {path: '/notes', element: <Notes />}
  ]);

  return routes;
};




export default App
