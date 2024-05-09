import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { MdLogout, MdOutlineSpaceDashboard } from 'react-icons/md';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { SlSupport } from 'react-icons/sl';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [openProfile, setOpenProfile] = useState(false)
  return (
    <div className='px-2 py-2'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-center'>
          <h1 className='text-n-8/50 h6'>Control Center</h1>
        </div>
        <div className='flex justify-between w-[400px]'>
          <div className={`flex items-center border rounded-md ${isFocus ? 'border-slate-800' : 'border-transparent'}`}>
            <input type="text" className='bg-n-1 text-n-8 focus:outline-none rounded-l-md px-3 h-full text-sm' placeholder='Search...' onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)}/>
            <button className='bg-n-1 h-full px-2 rounded-r-md'>
              <IoIosSearch size={20} style={{color: 'grey'}} />
            </button>
          </div>
          <div className="hidden lg:flex items-center justify-center border text-n-8 border-n-8 px-5 py-1 rounded-lg w-[145px] cursor-pointer" onClick={() => setOpenProfile(!openProfile)}>
                <FaUserCircle size={20} />
                <h3 className="ml-3 mt-[0.1rem] text-n-8">{userInfo.name}</h3>
                {openProfile ? <RiArrowDropDownLine style = {{transform: 'rotate(180deg)' }} size={30}/>  : <RiArrowDropDownLine size={30}/>}
                {
                openProfile 
                ? (<div className="absolute top-7 bg-n-1 mt-11 w-[150px] border rounded-md text-center text-n-8">
                  <div className="flex items-center hover:bg-n-8/10 px-5 py-2 pt-3 pl-6 h-[45px]">
                    <IoHomeOutline size={20} style={{width: '20px'}}/>
                    <Link to='/' className="ml-3 text-[0.9rem] tracking-wider">Home</Link>
                  </div>
                  <div className="flex items-center hover:bg-n-8/10 px-5 py-2 pt-3 pl-6 h-[45px]">
                    <FaRegUser size={16} style={{width: '20px'}}/>
                    <Link to='/profile' className="ml-3 text-[0.9rem] tracking-wider">Profile</Link>
                  </div>
                  <div className="flex items-center hover:bg-n-8/10 px-5 py-2 pl-6 h-[45px]">
                    <SlSupport style={{width: '20px'}} />
                    <Link to='/profile/support' className="ml-3 text-[0.9rem] tracking-wider">Support</Link>
                  </div>
                </div>) : null
              }   
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
