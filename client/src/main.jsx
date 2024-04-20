import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import SigninForm from './_auth/SigninForm.jsx'
import SignupForm from './_auth/SignupForm.jsx'

import store from './store.js'
import { Provider } from 'react-redux'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route index={true} path='/login' element={<SigninForm/>}/>
      <Route index={true} path='/register' element={<SignupForm/>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>,
  </Provider>
)
