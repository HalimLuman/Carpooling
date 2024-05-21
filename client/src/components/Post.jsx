import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/explore/${post._id}`, { state: { post } });
    }

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
        <div className='w-full h-auto bg-white rounded-xl shadow-md p-6 m-4 transition duration-300 transform hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer' onClick={handleClick}>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                    <div className='bg-gray-200 w-16 h-16 flex justify-center items-center rounded-full'>
                        <FaRegUser size={32} color='gray'/>
                    </div>
                    <div className='ml-4'>
                        <h1 className='text-gray-800 text-lg font-semibold'>{post.publisher.name} {post.publisher.surname}</h1>
                        <p className='text-gray-600 text-sm'>{post.carModel} - {post.carYear}</p>
                    </div>
                </div>
                <div className='bg-blue-500 p-3 rounded-full'>
                    <MdOutlineVerifiedUser size={24} color='white'/>
                </div>
            </div>
            <div className='mt-6'>
                <h2 className='text-gray-800 text-lg font-semibold'>{post.from} - {post.to}</h2>
                <div className='flex justify-between mt-4'>
                    <h2 className='text-gray-700 text-base'>Trip Date:</h2>
                    <h2 className='text-gray-800 text-base'>{formatDate(post.date)}</h2>
                </div>
                <div className='flex justify-between mt-2'>
                    <h2 className='text-gray-700 text-base'>Price:</h2>
                    <h2 className='text-gray-800 text-base'>{post.price} MKD</h2>
                </div>
            </div>
        </div>
    );
};

export default Post;
