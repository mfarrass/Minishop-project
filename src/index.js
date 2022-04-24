import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import minishopStore from './Store/Store'
import App from './App'
import './app.css'

// untuk aplikasi front-end bisa membaca data harus di provide



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={minishopStore}>
    <App />
    </Provider>
  </React.StrictMode>
);

