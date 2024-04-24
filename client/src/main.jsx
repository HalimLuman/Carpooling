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
import Dashboard from './pages/Dashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/Profile.jsx'
import Subscription from './pages/Subscription.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/login' element={<SigninForm/>}/>
      <Route path='/register' element={<SignupForm/>}/>
      { /* Private Routes*/}
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Dashboard />}>
          <Route path='/profile/:id' element={<Profile />}/>
          <Route path='/profile/subscription' element={<Subscription />}/>
        </Route>
      </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
)
