import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiCalendarDate, CiMapPin, CiPhone } from "react-icons/ci";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { LiaCitySolid } from "react-icons/lia";
import EditProfile from '../components/sidebar-components/EditProfile';
import { useSelector, useDispatch } from 'react-redux';
import { useDeleteUserMutation, useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { profile, registration } from '../assets';
import MenuSvg from '../assets/svg/MenuSvg';

const Profile = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [deleteValidation, setDeleteValidation] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteUser] = useDeleteUserMutation();
  const [logoutApiCall] = useLogoutMutation();

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
    <div className='flex flex-col items-center lg:items-start w-full'>
      {/* User Information */}
      <div className='flex flex-col xl:flex-row justify-between items-center w-full my-4'>
        <div className='p-4 pb-0 bg-n-1 my-5 rounded-xl w-full md:w-[100%] xl:w-[60%] shadow h-max'>
          {/* Profile Image */}
          <div className='h-[230px]'>
            <img src={profile} alt="UserBackground" className='w-full object-cover h-[230px] rounded-xl'/>
          </div>
          {/* Profile Details */}
          <div className='flex flex-col md:flex-row items-center justify-between p-4 relative bottom-[2.5rem] w-[95%] mx-auto rounded-2xl shadow-md backdrop-blur-xl bg-white/70 '>
            {/* Profile Picture and Name */}
            <div className='flex w-full justify-around md:justify-start'>
              <img src={registration} alt="" className='w-[80px] h-[80px] rounded-lg'/>
              <div className='flex flex-col md:ml-5 text-n-8 self-end py-1 wrap'>
                <h1 className='h5 mb-1 ml-2 md:ml-0 font-bold max-w-[100%] md:max-w-[80%] xl:max-w-[100%] w-max overflow-hidden'>{userInfo.name}&nbsp;{userInfo.surname}</h1>
                <p className='text-n-8/80 ml-2 text-sm'>{userInfo.email}</p>
              </div>
            </div>
            {/* Profile Buttons */}
            <div className='text-n-8 flex flex-row-reverse mt-5 md:mt-0 w-full md:w-[450px] justify-around'>
              <button className='text-xs lg:text-sm px-3 py-2 mx-1 hover:text-sky-700 hover:font-bold w-[125px]'>View Profile</button>
              <button className='text-xs lg:text-sm border border-n-8/90 px-3 py-2 mx-1 hover:border-sky-700 hover:bg-sky-700 hover:text-n-1 rounded-md'>Change Picture</button>
            </div>
          </div>
        </div>
        {/* More Details */}
        <div className='py-7 px-5 bg-n-1 my-1 rounded-xl text-n-8 w-[100%] xl:w-[39%] shadow'>
          <h2 className='text-lg pl-2'>More details</h2>
          {/* User Details */}
          <div className='flex flex-col md:flex-row w-[100%] justify-between'>
            {/* Details Group 1 */}
            <div className='flex flex-wrap w-full justify-between'>
              {renderUserDetail('Date of Birth', userInfo.dateOfBirth, <CiCalendarDate size={30}/>)}
              {renderUserDetail('Gender', userInfo.gender, userInfo.gender === 'male' ? <BsGenderMale size={25}/> : <BsGenderFemale size={25} />, true)}
              {renderUserDetail('City', userInfo.city, <LiaCitySolid size={30}/>)}
              {renderUserDetail('Address', userInfo.address, <CiMapPin size={30}/>)}
              {renderUserDetail('Phone Number', `+389 ${userInfo.phone}`, <CiPhone size={30}/>)}
            </div>
          </div>
        </div>
      </div>
      {/* Edit Profile Component */}
      <div className='px-10 bg-n-1 my-1 rounded-xl text-n-8 shadow w-full self-center'>
        <EditProfile />
      </div>
      {/* Delete Account Button */}
      <div className='flex justify-start bg-n-1 py-5 px-5 my-4 shadow rounded-xl w-full self-center'>
        <button className='px-3 py-2 bg-red-600 text-n-1 border border-red-600 rounded-md text-sm hover:bg-n-1 hover:text-red-700 hover:font-bold' onClick={() => setIsClicked(true)}>Delete account</button>
      </div>
      {/* Delete Account Confirmation */}
      {isClicked && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-3'>
          <div className='fixed my-auto mx-auto bg-n-1 text-n-8 w-[90%] lg:w-[500px] shadow rounded-xl flex flex-col'>
            {/* Delete Account Header */}
            <div className='flex items-center justify-between px-4 py-4'>
              <h3>Delete the account {userInfo.name}&nbsp;{userInfo.surname}</h3>
              <button onClick={() => setIsClicked(false)}>
                <MenuSvg openNavigation={true} />
              </button>
            </div>
            <hr />
            {/* Delete Account Info */}
            <div className='self-center py-4 flex'>
              <img src="../../public/vite.svg" alt="" />
              <h1 className='h5 ml-5'>{userInfo.name}&nbsp;{userInfo.surname}</h1>
            </div>
            {/* Warning Message */}
            <div className='self-center py-4 w-[80%] text-center'>
              <div className='bg-[rgba(238,210,2,0.5)] p-3 border border-yellow-600 rounded-md text-sm'>
                <p className='text-n-8'>Unexpected things will happen if you don't read this!</p>
              </div>
            </div>
            {/* Delete Account Confirmation */}
            <div className='text-left w-[80%] mx-auto'>
              <p className='body-2 text-sm pt-4'>This will permanently delete the HalimLuman/Cs_skins repository, wiki, issues, comments, packages, secrets, workflow runs, and remove all collaborator associations.</p>
            </div>
            <hr />
            {/* Input for Confirmation */}
            <div className='self-center py-5 flex flex-col items-center'>
              <p className='text-center'>Type ' <span className=''>{userInfo.name}{userInfo.surname}/delete</span> ' to delete permanently</p>
              <input type="text" className={`bg-n-1 border w-[80%] md:w-full outline-none  border-n-8/50 py-1 rounded-md px-3 mt-2 ${deleteValidation === `${userInfo.name}${userInfo.surname}/delete` ? 'focus:border-green-700' : 'focus:border-red-600'}`} onChange={(e) => setDeleteValidation(e.target.value)} />
            </div>
            {/* Delete Button */}
            <div className='pb-5 flex justify-center'>
              <button disabled={deleteValidation !== `${userInfo.name}${userInfo.surname}/delete`} className={`w-[90%] px-3 py-2 bg-red-600 text-n-1 border border-red-600 rounded-md text-sm ${deleteValidation === `${userInfo.name}${userInfo.surname}/delete` ? 'hover:bg-n-1 hover:text-red-600 hover:font-bold' : 'opacity-[0.5]'} `} onClick={handleDelete}>I am aware and I want to delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to render user detail
const renderUserDetail = (label, value, icon) => (
  <div className='w-[100%] lg:w-[49%]'>
    <div className='flex items-center mt-7 mx-1 shadow rounded-md px-4 py-2 w-full h-[64px] overflow-hidden'>
      {icon}
      <div className='ml-2'>
        <h3 className='font-bold'>{label}</h3>
        <span className={`text-sky-600 text-sm `}>{value}</span>
      </div>
    </div>
  </div>
);

export default Profile;
