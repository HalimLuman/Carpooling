import React from 'react';
import { MdDelete } from "react-icons/md";
import { useDeletePostMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

// Function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const HistoryPost = ({ post }) => {
    const [deletePost] = useDeletePostMutation();
    const date = formatDate(post.date); // Format the date here

    const handleDelete = async () => {
        try {
            await deletePost(post._id);
            toast.success('Post Deleted successfully', { autoClose: 1000, pauseOnHover: false });
            setTimeout(() => {
                window.location.reload();
            },1500);
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'An error occurred while deleting user');
        }
    };

    return (
        <div className='w-full h-[60px] bg-n-1 flex px-5 py-4 border-t justify-between'>
            <div className='flex justify-between text-n-8 text-left w-[30%]'>
                <h2 className='text-lg'>{post.from}</h2>
                <h2 className='text-lg'>{post.to}</h2>
            </div>
            <div className='flex w-[30%] justify-between text-right'>
                <h2 className='text-lg body-2 text-n-8 min-w-[150px]'>{date}</h2>
                <h2 className='text-lg body-2 text-n-8 min-w-[150px]'>{post.price}</h2>
                <h2 className='text-lg body-2 text-n-8 min-w-[150px]'>{post.capacity}</h2>
            </div>
            <div className='w-[15%] flex justify-end items-center'>
                <div className='w-max bg-red-600 p-2 rounded-lg hover:bg-red-700 border border-red-600 hover:cursor-pointer' onClick={handleDelete}>
                    <MdDelete size={25} color='white'/>
                </div>
            </div>
        </div>
    );
};

export default HistoryPost;
