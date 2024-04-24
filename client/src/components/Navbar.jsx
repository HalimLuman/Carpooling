import React from 'react'
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className=' flex items-center justify-between px-15 pt-5'>
      <div className='flex flex-col items-center'>
        <h1 className='text-n-8 h6'>Welcome to Travel</h1>
        <p className='text-n-8 h5 font-bold'>Hello <span className='text-amber-600'>{userInfo.name}</span></p>
      </div>
      <div>
        <FaUserCircle size={40} style={{color: 'black'}}/>
      </div>
    </div>
  )
}

export default Navbar