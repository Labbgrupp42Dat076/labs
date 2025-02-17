import { StrictMode } from "react";
import { createRoot } from "react-dom";
import { Route, Routes } from "react-router";
import pomodoro from 
  
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />}/>
        <Route path="/pomodoro" element={<pomodoro />}/>
        <Route path="/todo" element={<App />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)