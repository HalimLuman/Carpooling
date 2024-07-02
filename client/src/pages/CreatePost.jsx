import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostInfo } from '../slices/postSlice';
import { toast } from 'react-toastify';
import '../css/form.css';
import { useCreatePostMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const CreatePost = () => {
    const initialData = {
        from: '',
        to: '',
        date: '',
        time: '',
        capacity: 0,
        price: 0,
        carModel: '',
        carColor: '',
        petsAllowed: null,
        smokingAllowed: null
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

        // Validate date at least one day ahead
        const currentDate = new Date();
        const selectedDate = new Date(data.date);
        currentDate.setDate(currentDate.getDate());

        if (selectedDate < currentDate) {
            toast.error('Please select a date at least one day ahead.');
            return;
        }

        try {
            const res = await createPost({
                publisher: userInfo._id,
                from: data.from,
                to: data.to,
                date: data.date,
                time: data.time,
                capacity: data.capacity,
                price: data.price,
                carModel: data.carModel,
                carColor: data.carColor,
                pets: data.petsAllowed,
                smoking: data.smokingAllowed
            }).unwrap();
            dispatch(setPostInfo(res));
            // Update Redux state with the updated user information
            dispatch(setCredentials(res.user)); // Assuming your API returns updated user info
            toast.success('Post created successfully', { autoClose: 2000, pauseOnHover: false });
        } catch (err) {
            console.error('Error creating post:', err);
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({
            ...data,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleToggleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value === 'true'
        });
    };

    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-8 py-10 rounded-xl">
            <div className="flex flex-col w-full">
                <form onSubmit={submitHandler}>
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Create Travel</h2>
                            <p className="text-gray-500 dark:text-gray-400">Use the form below to create a new travel.</p>
                        </div>
                        <button className="hidden md:block bg-sky-600 text-white text-lg px-8 py-3 rounded-lg hover:bg-sky-700 transition-colors duration-300">Create</button>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex flex-col md:w-[49%]">
                            <label className="text-gray-600 dark:text-gray-400 mb-1">Location:</label>
                            <input
                                type="text"
                                name="from"
                                placeholder='Enter the location you will start'
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col md:w-[49%]">
                            <label className="text-gray-600 dark:text-gray-400 mb-1">Destination:</label>
                            <input
                                type="text"
                                name="to"
                                placeholder='Enter the destination you will reach'
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 dark:text-gray-400 mb-1">Date:</label>
                        <input
                            type="date"
                            name="date"
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 dark:text-gray-400 mb-1">Time:</label>
                        <input
                            type="time"
                            name="time"
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 dark:text-gray-400 mb-1">Capacity:</label>
                        <input
                            type="number"
                            name="capacity"
                            placeholder='Number of passengers you accept'
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 dark:text-gray-400 mb-1">Price:</label>
                        <input
                            type="number"
                            name="price"
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 dark:text-gray-400 mb-1">Car Model:</label>
                        <input
                            type="text"
                            name="carModel"
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 dark:text-gray-400 mb-1">Car Color:</label>
                        <input
                            type="text"
                            name="carColor"
                            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-sky-500 transition-colors duration-300"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 dark:text-gray-400 mb-1">Allow Pets:</label>
                        <div className="flex justify-start gap-5 items-center mt-2">
                            <input
                                type="radio"
                                id="petsAllowedYes"
                                name="petsAllowed"
                                value={true}
                                className="hidden"
                                onChange={handleToggleChange}
                            />
                            <label htmlFor="petsAllowedYes" className={`cursor-pointer px-5 py-2 rounded-lg border border-green-500 ${data.petsAllowed === true ? 'bg-green-500 text-white' : 'bg-green-500/20'}`}>Yes</label>
                            <input
                                type="radio"
                                id="petsAllowedNo"
                                name="petsAllowed"
                                value={false}
                                className="hidden"
                                onChange={handleToggleChange}
                            />
                            <label htmlFor="petsAllowedNo" className={`cursor-pointer px-5 py-2 rounded-lg border border-red-500 ${data.petsAllowed === false ? 'bg-red-500 text-white' : 'bg-red-200/20'}`}>No</label>
                        </div>
                    </div>
                    <div className="flex flex-col mt-6">
                        <label className="text-gray-600 dark:text-gray-400 mb-1">Allow Smoking:</label>
                        <div className="flex justify-start gap-5 items-center mt-2">
                            <input
                                type="radio"
                                id="smokingAllowedYes"
                                name="smokingAllowed"
                                value={true}
                                className="hidden"
                                onChange={handleToggleChange}
                            />
                            <label htmlFor="smokingAllowedYes" className={`cursor-pointer px-5 py-2 rounded-lg border border-green-500 ${data.smokingAllowed === true ? 'bg-green-500 text-white' : 'bg-green-500/20'}`}>Yes</label>
                            <input
                                type="radio"
                                id="smokingAllowedNo"
                                name="smokingAllowed"
                                value={false}
                                className="hidden"
                                onChange={handleToggleChange}
                            />
                            <label htmlFor="smokingAllowedNo" className={`cursor-pointer px-5 py-2 rounded-lg border border-red-500 ${data.smokingAllowed === false ? 'bg-red-500 text-white' : 'bg-red-200/20'}`}>No</label>
                        </div>
                    </div>
                    <button className="md:hidden mt-6 w-full bg-sky-600 text-white px-5 py-3 rounded-lg hover:bg-sky-700 transition-colors duration-300" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;

