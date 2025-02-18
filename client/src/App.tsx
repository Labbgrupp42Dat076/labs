import { useState } from 'react'
import './App.css'
import TodoPage from './TodoPage/TodoPage'
import {useRoutes} from 'react-router-dom'
import Pomodoro from './pomodoro'


const App = () => {
  const routes = useRoutes([
      { path: '/', element: <TodoPage /> },
      {path: '/pomodoro', element: <Pomodoro />}
  ]);

  return routes;
};

export default App
