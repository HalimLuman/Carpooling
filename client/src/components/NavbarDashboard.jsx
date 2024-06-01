import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IoHomeOutline } from 'react-icons/io5';
import { SlSupport } from 'react-icons/sl';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useLogoutMutation } from '../slices/usersApiSlice';

const NavbarDashboard = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [openProfile, setOpenProfile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logged out succesfully', {autoClose: 1500, pauseOnHover: false});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='px-2 py-2 z-2'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-center'>
          <h1 className='text-n-8/90 h6'>Control Center</h1>
        </div>
        <div className='flex justify-between w-[400px]'>
          <div className={`flex items-center border rounded-md ${isFocus ? 'border-slate-800' : 'border-transparent'}`}>
            <input type="text" className='bg-n-1 text-n-8 focus:outline-none rounded-l-md px-3 h-full text-sm' placeholder='Search...' onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)}/>
            <button className='bg-n-1 h-full px-2 rounded-r-md'>
              <IoIosSearch size={20} style={{color: '#0E0C15'}} />
            </button>
          </div>
          <div className="hidden lg:flex items-center justify-center border text-n-8 border-n-8 px-5 py-1 rounded-lg w-[145px] cursor-pointer" onClick={() => setOpenProfile(!openProfile)}>
                <FaUserCircle size={20} />
                <h2 className="ml-3 mt-[0.1rem] text-n-8">{userInfo.name}</h2>
                {openProfile ? <RiArrowDropDownLine style = {{transform: 'rotate(180deg)' }} size={30}/>  : <RiArrowDropDownLine size={30}/>}
                {
                openProfile 
                ? (<div className="absolute bg-n-1 mt-[15rem] w-[170px] border rounded-md text-center">
                  <div className="flex items-center hover:bg-n-8/10 px-5 py-2 pt-3 pl-6 h-[45px]">
                    <IoHomeOutline size={20} style={{width: '20px'}}/>
                    <Link to='/' className="ml-3 text-[0.9rem] tracking-wider">Home</Link>
                  </div>
                <div className="flex items-center hover:bg-n-8/10 px-5 py-2 pt-3 pl-6 h-[45px]">
                  <FaRegUser size={14}/>
                  <Link to='/profile' className="ml-3 text-[0.9rem] tracking-wider ">Profile</Link>
                </div>    
                <div className="flex items-center hover:bg-n-8/10 px-5 py-2  pl-6 h-[45px]">
                  <SlSupport />
                  <Link to='/support' className="ml-3 text-[0.9rem] tracking-wider">Support</Link>
                </div>
                <hr className="w-[80%] mx-auto"/>
                <div className="flex items-center hover:bg-n-8/10 px-5 py-3 pl-7 h-[45px]">
                  <MdLogout/>
                  <p onClick={logoutHandler} className="ml-3 tacking-wider text-[0.9rem]">Logout</p>
                </div>
              </div>) : null
              }   
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarDashboard;
