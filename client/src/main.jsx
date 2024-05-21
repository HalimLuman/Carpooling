import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import SigninForm from './_auth/SigninForm.jsx';
import SignupForm from './_auth/SignupForm.jsx';
import DashboardLayout from './pages/DashboardLayout.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from './pages/Profile.jsx';
import Subscription from './pages/Subscription.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ChangePassword from './components/sidebar-components/ChangePassword.jsx';

import './index.css';
import CreatePost from './pages/CreatePost.jsx';
import Explore from './pages/Explore.jsx';
import { PostFilterProvider } from './context/PostFilter.jsx';
import History from './pages/History.jsx';
import PostInfo from './pages/PostInfo.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/login' element={<SigninForm/>}/>
      <Route path='/register' element={<SignupForm/>}/>
      <Route path='/support' element={<SignupForm/>}/>
      <Route path='/explore' element={<PostFilterProvider><Explore /></PostFilterProvider>}/>
      <Route path='/explore/:id' element={<PostInfo/>}/>
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path='/dashboard/' element={<Dashboard />} />
          <Route path='/dashboard/:id' element={<Profile />}/>
          <Route path='/dashboard/subscription' element={<Subscription />}/>
          <Route path='/dashboard/change-password' element={<ChangePassword />}/>
          <Route path='/dashboard/create-post' element={<CreatePost />}/>
          <Route path='/dashboard/history' element={<History />}/>
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
);

