import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './components/context/GlobalContext.jsx'
import { BasketContextProvider } from './components/context/BasketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <BasketContextProvider>
          <App />
        </BasketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
