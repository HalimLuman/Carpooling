import React from 'react';
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (post.reservations.length < post.capacity) {
            navigate(`/explore/${post._id}`, { state: { post } });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div 
            className={`w-[90%] lg:w-full h-auto bg-white dark:bg-neutral-900 rounded-xl shadow-md p-6 my-4 hover:transition hover:duration-200 hover:transform ${
                post.reservations.length < post.capacity 
                    ? 'hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer' 
                    : 'cursor-not-allowed opacity-50'
            }`}
            onClick={handleClick}
        >
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='bg-gray-200 dark:bg-gray-700 flex justify-center items-center rounded-full'>
                        <img src={post.publisher.profilePic} width={50} height={50}/>
                    </div>
                    <div className='ml-4'>
                        <h1 className='text-gray-800 dark:text-gray-100 text-lg font-semibold'>
                            {post.publisher.name} {post.publisher.surname}
                        </h1>
                    </div>
                </div>
                <div className='bg-blue-500 p-3 rounded-full'>
                    <MdOutlineVerifiedUser size={24} color='white'/>
                </div>
            </div>
            <div className='mt-6'>
                <h2 className='text-gray-800 dark:text-gray-100 text-lg font-semibold'>
                    {post.from} - {post.to}
                </h2>
                <div className='flex justify-between mt-4'>
                    <h2 className='text-gray-700 dark:text-gray-400 text-base'>Trip Date:</h2>
                    <h2 className='text-gray-800 dark:text-gray-100 text-base'>
                        {formatDate(post.date)}
                    </h2>
                </div>
                <div className='flex justify-between mt-2'>
                    <h2 className='text-gray-700 dark:text-gray-400 text-base'>Trip Time:</h2>
                    <h2 className='text-gray-800 dark:text-gray-100 text-base'>
                        {post.time}
                    </h2>
                </div>
                <div className='flex justify-between mt-2'>
                    <h2 className='text-gray-700 dark:text-gray-400 text-base'>Capacity:</h2>
                    <h2 className='text-gray-800 dark:text-gray-100 text-base'>
                        {post.capacity}
                    </h2>
                </div>
                <div className='flex justify-between mt-2'>
                    <h2 className='text-gray-700 dark:text-gray-400 text-base'>Price:</h2>
                    <h2 className='text-gray-800 dark:text-gray-100 text-base'>
                        {post.price} MKD
                    </h2>
                </div>
                <div className='flex justify-between mt-4'>
                    <h2 className='text-gray-700 dark:text-gray-400 text-base'>Reservations:</h2>
                    <h2 className='text-gray-800 dark:text-gray-100 text-base'>
                        {post.reservations.length} / {post.capacity}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Post;
