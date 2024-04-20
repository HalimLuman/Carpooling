import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
        <div>
          <Outlet />
        </div>
    </>
  )
}

export default App