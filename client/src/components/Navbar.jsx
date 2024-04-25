import React from 'react'
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className='px-15 py-2 bg-n-1 border-b border-n-8/20'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-center'>
          <h1 className='text-n-8 h6'>USER PANEL</h1>
        </div>
        <div>
          <FaUserCircle size={40} style={{color: 'black'}}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
