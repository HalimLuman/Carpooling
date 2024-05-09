import React, { useEffect, useState } from 'react';
import { profile, registration } from '../assets';
import EditProfile from '../components/sidebar-components/EditProfile';
import { CiCalendarDate } from "react-icons/ci";
import { BsGenderAmbiguous } from "react-icons/bs";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import { LiaCitySolid } from "react-icons/lia";
import { CiMapPin } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import MenuSvg from '../assets/svg/MenuSvg';

import { useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import { useDeleteUserMutation, useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

import { toast } from 'react-toastify'

const Profile = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [deleteValidation, setDeleteValidation] = useState('');

  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteUser] = useDeleteUserMutation();

  
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        await deleteUser(userInfo._id).unwrap();
        navigate('/register');
        toast.success('Profile Deleted successfully', { autoClose: 1500, pauseOnHover: false });
    } catch (err) {
        console.error(err);
        toast.error(err.message || 'An error occurred while deleting user');
    }
};

  return (
    <div className='flex flex-col items-center lg:items-start'>
      <div className='flex flex-col xl:flex-row justify-between items-center w-full my-4'>
        <div className='p-4 pb-0 bg-n-1 my-5 rounded-xl w-[100%] md:w-[95%] xl:w-[60%] shadow h-full'>
          <div className='h-[230px]'>
            <img src={profile} alt="UserBackground" className='w-full object-cover h-[230px] rounded-xl'/>
          </div>

          <div>
            <div className='flex flex-col md:flex-row items-center justify-between p-4 relative bottom-[2.5rem] w-[95%] mx-auto rounded-2xl shadow-md backdrop-blur-xl bg-white/70 '>
              <div className='flex w-full justify-around md:justify-start'>
                <img src={registration} alt="" className='w-[80px] h-[80px] rounded-lg'/>
                <div className='flex flex-col md:ml-5 text-n-8 self-end py-1 wrap'>
                  <h1 className='h5 mb-1 ml-2 md:ml-0 font-bold max-w-[45%] md:max-w-[80%] xl:max-w-[100%] w-max overflow-hidden'>{userInfo.name}&nbsp;{userInfo.surname}</h1>
                  <p className='text-n-8/80 ml-2 text-sm'>{userInfo.email}</p>
                </div>
              </div>
              <div className='text-n-8 flex flex-row-reverse mt-5 md:mt-0 w-full md:w-[450px] justify-around'>
                <button className='text-xs lg:text-sm px-3 py-2 mx-1 hover:text-sky-700 hover:font-bold w-[125px]'>View Profile</button>
                <button className='text-xs lg:text-sm border border-n-8/90 px-3 py-2 mx-1 hover:border-sky-700 hover:bg-sky-700 hover:text-n-1 rounded-md'>Change Picture</button>
              </div>
            </div>
          </div>
        </div>
        <div className='py-7 px-10 bg-n-1 my-1 rounded-xl text-n-8 w-[95%] xl:w-[39%] h-full shadow'>
          <h2 className='text-lg pl-1'>More details</h2>
          <div className='flex flex-col md:flex-row w-[85%] justify-between pl-3'>
            <div>
              <div>
                <div>
                  <div className='flex items-center mt-7 shadow rounded-md px-4 py-2 hover:mt-6 hover:mb-8'>
                    <CiCalendarDate size={30}/>
                    <div className='ml-5'>
                      <h3 className='font-bold'>Date of Birth</h3>
                      <span className='text-sky-600 text-sm'>{userInfo.dateOfBirth}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='flex items-center mt-7 shadow rounded-md px-4 py-2 hover:mt-6 hover:mb-8'>
                    <BsGenderAmbiguous size={30}/>
                    <div className='ml-5'>
                      <h3 className='font-bold'>Gender</h3>
                      <div className='text-sky-600 text-sm flex items-center'>
                        {userInfo.gender === 'male' ? <BsGenderMale /> : <BsGenderFemale />}
                        <span className='ml-1'>{userInfo.gender}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='flex items-center mt-7 shadow rounded-md px-4 py-2 hover:mt-6 hover:mb-8'>
                    <LiaCitySolid size={30}/>
                    <div className='ml-5'>
                      <h3 className='font-bold'>City</h3>
                      <span className='text-sky-600 text-sm'>{userInfo.city}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <div className='flex items-center mt-7 shadow rounded-md px-4 py-2 hover:mt-6 hover:mb-8'>
                    <CiMapPin size={30}/>
                    <div className='ml-5'>
                      <h3 className='font-bold'>Address</h3>
                      <span className='text-sky-600 text-sm'>{userInfo.address}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='flex items-center mt-7 shadow rounded-md px-4 py-2 hover:mt-6 hover:mb-8'>
                    <CiPhone size={30}/>
                    <div className='ml-5'>
                      <h3 className='font-bold'>Phone Number</h3>
                      <span className='text-sky-600 text-sm'>+389 {userInfo.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='py-7 px-10 bg-n-1 my-1 rounded-xl text-n-8 shadow w-[95%] xl:w-full self-center'>
      <EditProfile />
      </div>
      <div className='flex justify-start bg-n-1 py-5 px-5 my-4 shadow rounded-xl w-[95%] xl:w-full self-center'>
        <button className='px-3 py-2 bg-red-600 text-n-1 border border-red-600 rounded-md text-sm hover:bg-n-1 hover:text-red-700 hover:font-bold' onClick={() => setIsClicked(true)}>Delete account</button>
      </div>
      {isClicked && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-3'>
          <div className='fixed my-auto mx-auto bg-n-1 text-n-8 w-[500px] shadow rounded-xl flex flex-col'>
          <div className='flex items-center justify-between px-4 py-4'>
              <h3>Delete the account {userInfo.name}&nbsp;{userInfo.surname}</h3>
              <button onClick={() => setIsClicked(false)}>
                <MenuSvg openNavigation={true} />
              </button>
            </div>
            <hr />
            <div className='self-center py-4 flex'>
              <img src="../../public/vite.svg" alt="" />
              <h1 className='h5 ml-5'>{userInfo.name}&nbsp;{userInfo.surname}</h1>
            </div>
            <hr className='w-[90%] mx-auto'/>
            <div className='self-center py-4 w-[80%] text-center'>
              <div className='bg-[rgba(238,210,2,0.5)] p-3 border border-yellow-600 rounded-md text-sm'>
                <p className='text-n-8'>Unexpected things will happen if you don't read this!</p>
              </div>
            </div>
            <div className='text-left w-[80%] mx-auto'>
              <p className='body-2 text-sm pt-4'>This will permanently delete the HalimLuman/Cs_skins repository, wiki, issues, comments, packages, secrets, workflow runs, and remove all collaborator associations.</p>
              <p className='body-2 text-sm py-4'>This will permanently delete the HalimLuman/Cs_skins repository, wiki, issues, comments, packages, secrets, workflow runs, and remove all collaborator associations.</p>
            </div>
            <hr />
            <div className='self-center py-5'>
              <p className='text-center'>Type ' <span className=''>{userInfo.name}{userInfo.surname}/delete</span> ' to delete permanently</p>
              <input type="text" className={`bg-n-1 border w-full outline-none  border-n-8/50 py-1 rounded-md px-3 mt-2 ${deleteValidation === `${userInfo.name}${userInfo.surname}/delete` ? 'focus:border-green-700' : 'focus:border-red-600'}`} onChange={(e) => setDeleteValidation(e.target.value)} />
            </div>
            <div className='pb-5 flex justify-center'>
              <button disabled={deleteValidation === `${userInfo.name}${userInfo.surname}/delete` ? false : true} className={deleteValidation === `${userInfo.name}${userInfo.surname}/delete` ? 'w-[90%] px-3 py-2 bg-red-600 text-n-1 border border-red-600 rounded-md text-sm hover:bg-n-1 hover:text-red-600 hover:font-bold' : 'w-[90%] px-3 py-2 bg-red-600 text-n-1 border border-red-600 rounded-md text-sm opacity-[0.5]'} onClick={handleDelete}>I am aware and I want to delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
