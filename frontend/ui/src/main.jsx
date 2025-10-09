
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppState from './context/AppState.jsx'
import UserState from './context/UserState.jsx'









createRoot(document.getElementById('root')).render(
  <UserState>
    <AppState>
    <App />
    </AppState>
  </UserState>,
)
