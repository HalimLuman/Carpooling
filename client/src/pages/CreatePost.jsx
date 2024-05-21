import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostInfo } from '../slices/postSlice';
import { toast } from 'react-toastify';
import '../css/form.css';
import { useCreatePostMutation } from '../slices/usersApiSlice';

const CreatePost = () => {
    const [data, setData] = useState({
        from: '',
        to: '',
        date: '',
        time: '',
        capacity: 0,
        price: 0,
    });

    useEffect(() => {
        setData({
            from: '',
            to: '',
            date: '',
            time: '',
            capacity: '',
            price: '',
        });
    }, []);

    const dispatch = useDispatch();

    const [createPost] = useCreatePostMutation();
    const {userInfo} = useSelector((state) => state.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await createPost({
                publisher: userInfo._id,
                from: data.from,
                to: data.to,
                date: data.date,
                time: data.time,
                capacity: data.capacity,
                price: data.price,
            }).unwrap();
            dispatch(setPostInfo(res));
            toast.success('Post created successfully', { autoClose: 2000, pauseOnHover: false });
        } catch (err) {
            console.error('Error creating post:', err);
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className='flex flex-col bg-n-1 text-n-8 px-10 rounded-xl'>
            <div className='flex flex-col mt-4 w-[100%]'>
                <form onSubmit={submitHandler}>
                    <div className='flex justify-between'>
                        <div className='text-center md:text-left'>
                            <h2 className='h6 md:h5 font-bold'>Create Travel</h2>
                            <p className='body-2'>Use the form below to create a new travel.</p>
                        </div>
                        <button className='hidden md:block border px-5 py-3 rounded-lg border-sky-600 text-sky-600 hover:text-n-1 hover:bg-sky-600 h-max'>Post Travel</button>
                    </div>
                    <div className='flex flex-col md:flex-row justify-between mt-2'>
                        <div className='flex flex-col md:w-[49%]'>
                            <label className='relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm'>From:</label>
                            <input type="text" className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]' onChange={(e) => setData({...data, from: e.target.value})} />
                        </div>
                        <div className='flex flex-col md:w-[49%] mt-5 md:mt-0'>
                            <label className='relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm'>To:</label>
                            <input type="text" className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]' onChange={(e) => setData({...data, to: e.target.value})} />
                        </div>
                    </div>
                    <div className='flex flex-col w-full my-5'>
                        <label className="relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm">Date</label>
                        <input className="bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]" type="date" onChange={(e) => setData({...data, date: e.target.value})} />
                    </div>
                    <div className='flex flex-col w-full my-5'>
                        <label className='relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm'>Time</label>
                        <input type="time" className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]' onChange={(e) => setData({...data, time: e.target.value})} />
                    </div>
                    <div className='flex flex-col w-full my-5'>
                        <label className='relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm'>Capacity</label>
                        <input type="number" className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]' onChange={(e) => setData({...data, capacity: e.target.value})} />
                    </div>
                    <div className='flex flex-col w-full my-5'>
                        <label className='relative top-[0.59rem] bg-n-1 w-max left-2 px-1 text-sm'>Price</label>
                        <input type="number" className='bg-n-1 border outline-none hover:border-sky-700 focus:border-sky-700 border-n-8/50 py-3 rounded-md px-3 h-[50px]' onChange={(e) => setData({...data, price: e.target.value})} />
                    </div>

                    <button className='md:hidden w-full border px-5 py-3 rounded-lg border-sky-600 text-sky-600 hover:text-n-1 hover:bg-sky-600 h-max' type='submit'>Save Profile</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
