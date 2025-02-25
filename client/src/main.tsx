import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { NavigationPanel } from './components/navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        
    <BrowserRouter>
    <NavigationPanel/>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
