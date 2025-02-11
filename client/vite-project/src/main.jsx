import  React  from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ToastContainer theme='dark' position='top-right' autoClose = {3000} closeOnClick pauseOnHover/>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
