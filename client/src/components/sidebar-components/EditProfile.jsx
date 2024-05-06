import React, { useEffect, useState } from 'react'
import { useDeleteUserMutation, useUpdateUserMutation } from '../../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../slices/authSlice'
import '../../css/form.css'
import { useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';

const EditProfile = () => {
    const [data, setData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        gender: '',
        dateOfBirth : '',
    });

    const [logoutApiCall] = useLogoutMutation();

    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
  
    useEffect(() => {
        setData(prevData => ({
            ...prevData,
            name: userInfo.name || '',
            surname: userInfo.surname || '',
            email: userInfo.email || '',
            phone: userInfo.phone || '',
            dateOfBirth : userInfo.dateOfBirth || '',
            city : userInfo.city || '',
            address : userInfo.address || '',
        }));
    }, [userInfo.name, userInfo.surname, userInfo.email, userInfo.phone, userInfo.dateOfBirth]);
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
        const res = await updateProfile({
            _id: userInfo._id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            phone: data.phone,
            dateOfBirth: data.dateOfBirth,
            city: data.city,
            address: data.address,
        }).unwrap();
        dispatch(setCredentials({...res}));
        toast.success('Profile updated succesfully', {autoClose: 2000, pauseOnHover: false});
        } catch (err) {
        toast.error(err?.data?.message || err.error);
        }
      }; 

  return (
    <div className='flex flex-col'>
        <div className='flex flex-col mt-4 w-[100%]'>
            <form onSubmit={submitHandler}>
                <div className='flex justify-between'>
                    <div className='text-center md:text-left'>
                        <h2 className='h6 md:h5 font-bold'>Personal Information</h2>
                        <p className='body-2'>Use the form below to update your profile.</p>
                    </div>
                    <button className='hidden md:block border px-5 py-3 rounded-lg border-sky-600 text-sky-600 hover:text-n-1 hover:bg-sky-600 h-max'>Save Profile</button>
                </div>
                <div className='flex flex-col md:flex-row justify-between mt-2'>
                    <div className='flex flex-col md:w-[49%]'>
                        <label className='relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm'>First Name</label>
                        <input type="text" className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]' placeholder={data.name} onChange={(e) => setData({...data, name: e.target.value})} />        
                    </div>
                    <div className='flex flex-col md:w-[49%] mt-5 md:mt-0'>
                        <label className='relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm'>Last Name</label>
                        <input type="text" className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]' placeholder={data.surname} onChange={(e) => setData({...data, surname: e.target.value})} />    
                    </div>
                </div>
                <div className='flex flex-col w-full my-5'>
                    <label className="relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm">E-mail</label>
                    <input className="bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]" type="email" placeholder={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
                </div>
                <div className='flex flex-col w-full my-5'>
                    <label className="relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm">Date of Birth</label>
                    <input className="bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]" type="date" placeholder={data.dateOfBirth} onChange={(e) => setData({...data, dateOfBirth: e.target.value})} />
                </div>
                <div className='flex flex-col w-full my-5'>
                    <label className='relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm'>City</label>
                    <input type="text" className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]' placeholder={data.city} onChange={(e) => setData({...data, city: e.target.value})} />    
                </div>
                <div className='flex flex-col w-full my-5'>
                    <label className='relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm'>Address</label>
                    <input type="text" className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]' placeholder={data.address} onChange={(e) => setData({...data, address: e.target.value})} />    
                </div>
                <div className='flex flex-col w-full my-5'>
                    <label className="relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm">Phone Number</label>
                    <div className='flex w-full items-center'>
                        <div className='border h-[50px]  border-n-8/50 py-3 px-2 rounded-l-md'>+389</div>
                        <input className="bg-n-1 border w-full outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-r-md px-3 h-[50px]" maxLength={8} pattern="[0-9]{8}" type="tel" placeholder={data.phone} onChange={(e) => setData({...data, phone: e.target.value})} />
                    </div>
                </div>

                <button className='md:hidden w-full border px-5 py-3 rounded-lg border-sky-600 text-sky-600 hover:text-n-1 hover:bg-sky-600 h-max' type='submit'>Save Profile</button>
            </form>
        </div>

    </div>
  )
}

export default EditProfile