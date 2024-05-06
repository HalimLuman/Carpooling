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
import DashboardContent from './pages/DashboardContent.jsx'
import ChangePassword from './components/sidebar-components/ChangePassword.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/login' element={<SigninForm/>}/>
      <Route path='/register' element={<SignupForm/>}/>
      <Route path='/support' element={<SignupForm/>}/>
      { /* Private Routes*/}
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard/main' element={<DashboardContent />} />
          <Route path='/dashboard/:id' element={<Profile />}/>
          <Route path='/dashboard/subscription' element={<Subscription />}/>
          <Route path='/dashboard/change-password' element={<ChangePassword />}/>
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
