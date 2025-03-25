import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Store from './ReduxToolkit/Store'
import { ToastProvider } from './components/ui/toast'
import MainContext from './Context/MainContext'
import { Toaster } from './components/ui/toaster'
createRoot(document.getElementById('root')).render(

  <BrowserRouter>

    <Provider store={Store}>
      <MainContext>

        <App />
        <Toaster />

      </MainContext>

    </Provider>
  </BrowserRouter>
)
