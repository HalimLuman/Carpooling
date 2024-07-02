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
import ChangePassword from './components/sidebar-components/ChangePassword.jsx';
import Support from './pages/Support.jsx'

import './index.css';
import CreatePost from './pages/CreatePost.jsx';
import Explore from './pages/Explore.jsx';
import { PostFilterProvider } from './context/PostFilter.jsx';
import History from './pages/History.jsx';
import PostInfo from './pages/PostInfo.jsx'
import NotFound from './pages/NotFound.jsx';
import SafetyGuideline from './pages/SafetyGuideline.jsx';
import Reservations from './pages/Reservations.jsx';

import { AccountLayout, AccountMain, AccountProfile, AccountSecurity, AccountPayment, AccountStatistics, AccountDeactivation, AccountSettings} from './pages/account/exports.js'
import AccountRequests from './pages/AccountRequests.jsx';
import AccountHistoryCreate from './pages/AccountHistoryCreate.jsx';
import AccountHistoryJoin from './pages/AccountHistoryJoin.jsx';

import './i18n';
import ForgotPassword from './components/ForgotPassword.jsx';
import PasswordReset from './pages/PasswordReset.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/login' element={<SigninForm/>}/>
      <Route path='/register' element={<SignupForm/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/support' element={<Support/>}/>
      <Route path='/safety-guideline' element={<SafetyGuideline/>}/>
      <Route path='/explore' element={<PostFilterProvider><Explore /></PostFilterProvider>}/>
      <Route path='/explore/:id' element={<PostInfo/>}/>
      <Route path='/profiles/:id' element={<Profile />}/>
      <Route path="/resetpassword/:resettoken" element={<PasswordReset />} />
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path='/dashboard/subscription' element={<Subscription />}/>
          <Route path='/dashboard/change-password' element={<ChangePassword />}/>
          <Route path='/dashboard/create-post' element={<CreatePost />}/>
          <Route path='/dashboard/history' element={<History />}/>
          <Route path='/dashboard/reservation' element={<Reservations />}/>
        </Route>
        <Route path='/account' element={<AccountLayout />}>
         <Route path='/account/' element={<AccountMain />} />
         <Route path='/account/personal-information' element={<AccountProfile />} />
         <Route path='/account/security' element={<AccountSecurity />} />
         <Route path='/account/payments-payouts' element={<AccountPayment />} />
         <Route path='/account/pending-requests' element={<AccountRequests />} />
         <Route path='/account/created-carpool-history' element={<AccountHistoryCreate />} />
         <Route path='/account/joined-carpool-history' element={<AccountHistoryJoin />} />
         <Route path='/account/account-statistics' element={<AccountStatistics />} />
         <Route path='/account/account-deactivation' element={<AccountDeactivation />} />
         <Route path='/account/settings' element={<AccountSettings />} />
        </Route>
      </Route>
        
      <Route path="*" element={<NotFound />} />
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

