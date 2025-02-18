
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import Pomodoro from './pomodoro'
import axios from 'axios'

import TodoPage from './TodoPage/TodoPage'

import { Notes } from './pages/Notes'
axios.defaults.withCredentials = true;


import {useRoutes} from 'react-router-dom'
import Pomodoro from './pomodoro'

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
      {path: '/pomodoro', element: <Pomodoro />}
  ]);

  return routes;
};




export default App
