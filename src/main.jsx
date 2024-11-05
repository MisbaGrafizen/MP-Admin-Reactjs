import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <StrictMode>
      <NextUIProvider>
        <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <App />
          </SnackbarProvider>
        </BrowserRouter>
      </NextUIProvider>
    </StrictMode>
  </Provider>,
);
