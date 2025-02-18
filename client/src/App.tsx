import './App.css'
import Pomodoro from './pomodoro'
import {Notes} from './pages/Notes'

import TodoPage from './TodoPage/TodoPage'
import {useRoutes} from 'react-router-dom'

const App = () => {
  const routes = useRoutes([
      { path: '/', element: <TodoPage /> },
      {path: '/pomodoro', element: <Pomodoro />},
      {path: '/todo', element: <TodoPage />},
      {path: '/notes', element: <Notes />}
  ]);

  return routes;
};

export default App
