



import './App.css'
import Pomodoro from './pages/PomodoroPage/pomodoro'
import axios from 'axios'


import TodoPage from './pages/TodoPage/TodoPage'

import { Notes } from './pages/NotesPage/Notes'


import {useRoutes} from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'

axios.defaults.withCredentials = true;


const App = () => {

  const routes = useRoutes([
      { path: '/', element: <LoginPage /> },
      {path: '/pomodoro', element: <Pomodoro />},
      {path: '/todo', element: <TodoPage />},
      {path: '/notes', element: <Notes />},
      {path: '/error/:status', element: <ErrorPage/>},
      {path:"*", element:<ErrorPage/>}
  ]);

  return routes;
};




export default App
