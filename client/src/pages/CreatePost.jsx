import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostInfo } from '../slices/postSlice';
import { toast } from 'react-toastify';
import '../css/form.css';
import { useCreatePostMutation } from '../slices/usersApiSlice';

const CreatePost = () => {
    const initialData = {
        from: '',
        to: '',
        date: '',
        time: '',
        capacity: 0,
        price: 0,
        carModel: '',
        carColor: ''
    };

    const [data, setData] = useState(initialData);
    const dispatch = useDispatch();
    const [createPost] = useCreatePostMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        setData(initialData);
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await createPost({
                publisher: userInfo._id,
                ...data,
            }).unwrap();
            dispatch(setPostInfo(res));
            toast.success('Post created successfully', { autoClose: 2000, pauseOnHover: false });
        } catch (err) {
            console.error('Error creating post:', err);
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <div className="flex flex-col bg-white text-gray-800 px-8 py-10 rounded-xl">
            <div className="flex flex-col w-full">
                <form onSubmit={submitHandler}>
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-semibold text-gray-700">Create Travel</h2>
                            <p className="text-gray-500">Use the form below to create a new travel.</p>
                        </div>
                        <button className="hidden md:block bg-sky-600 text-white px-5 py-3 rounded-lg hover:bg-sky-700 transition-colors duration-300">Post Travel</button>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex flex-col md:w-[49%]">
                            <label className="text-gray-600 mb-1">Location:</label>
                            <input
                                type="text"
                                name="from"
                                placeholder='Enter the location you will start'
                                className="bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col md:w-[49%]">
                            <label className="text-gray-600 mb-1">Destination:</label>
                            <input
                                type="text"
                                name="to"
                                placeholder='Enter the destination you will reach'
                                className="bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 mb-1">Date:</label>
                        <input
                            type="date"
                            name="date"
                            className="bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 mb-1">Time:</label>
                        <input
                            type="time"
                            name="time"
                            className="bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 mb-1">Capacity:</label>
                        <input
                            type="number"
                            name="capacity"
                            placeholder='Number of passengers you accept'
                            className="bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 mb-1">Price:</label>
                        <input
                            type="number"
                            name="price"
                            className="bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 mb-1">Car Model:</label>
                        <input
                            type="text"
                            name="carModel"
                            className="bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 mb-1">Car Color:</label>
                        <input
                            type="text"
                            name="carColor"
                            className="bg-gray-100 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                        />
                    </div>
                    <button className="md:hidden mt-6 w-full bg-sky-600 text-white px-5 py-3 rounded-lg hover:bg-sky-700 transition-colors duration-300" type="submit">Post Travel</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
