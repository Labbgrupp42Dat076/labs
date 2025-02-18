import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Route, Routes } from 'react-router'
import Pomodoro from './pomodoro.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
