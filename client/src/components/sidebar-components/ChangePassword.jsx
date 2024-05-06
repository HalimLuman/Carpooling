import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux' 
import { useUpdateUserMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';

const ChangePassword = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
});

const dispatch = useDispatch();

const [updateProfile] = useUpdateUserMutation();

const submitHandler = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name: userInfo.name,
          surname: userInfo.surname,
          email: userInfo.email,
          phone: userInfo.phone,
          dateOfBirth: userInfo.dateOfBirth,
          city: userInfo.city,
          address: userInfo.address,
          password: data.password,
        }).unwrap();
        dispatch(setCredentials({...res}));
        toast.success('Password has changed succesfully', {autoClose: 1500, pauseOnHover: false});
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

return (
<div className='flex flex-col text-n-8 bg-n-1 py-7 px-10 my-1 rounded-xl shadow w-full'>
    <div className='flex flex-col mt-4 w-[100%]'>
        <form onSubmit={submitHandler}>
            <div className='flex justify-between'>
                <div className='text-center md:text-left'>
                    <h2 className='h6 md:h5 font-bold'>Change Password</h2>
                    <p className='body-2'>Use the form below to update your profile.</p>
                </div>
                <button className='hidden md:block border px-5 py-3 rounded-lg border-sky-600 text-sky-600 hover:text-n-1 hover:bg-sky-600 h-max'>Save Password</button>
            </div>
                <div className='flex flex-col '>
                    <label className='relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm'>Password</label>
                    <input type="password" className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]' onChange={(e) => setData({...data, password: e.target.value})} />        
                </div>
                <div className='flex flex-col mt-5 md:mt-0'>
                    <label className='relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm'>Confirm Password</label>
                    <input type="password" className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]' onChange={(e) => setData({...data, confirmPassword: e.target.value})} />    
                </div>

            <button className='md:hidden w-full border px-5 py-3 rounded-lg border-sky-600 text-sky-600 hover:text-n-1 hover:bg-sky-600 h-max' type='submit'>Save Profile</button>
        </form>
    </div>

</div>
)
}

export default ChangePassword