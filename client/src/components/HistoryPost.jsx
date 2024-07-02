import React from 'react';
import { MdDelete } from 'react-icons/md';
import { useDeletePostMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';

// Function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const HistoryPost = ({ post, isOngoing }) => {
    const dispatch = useDispatch();
    const [deletePost] = useDeletePostMutation();
    const date = formatDate(post.date); // Format the date here
    const { userInfo } = useSelector((state) => state.auth);

    const handleDelete = async () => {
        try {
            // Perform deletion of post
            await deletePost(post._id);
            // Update userInfo in Redux state
            const updatedUserInfo = {
                ...userInfo,
                posts: userInfo.posts.filter(p => p !== post._id), // Remove deleted post from userInfo.posts
                deletedPosts: userInfo.deletedPosts + 1, // Increment deletedPosts count
            };
            dispatch(setCredentials(updatedUserInfo));

            // Notify user of successful deletion
            toast.success('Post Deleted successfully', { autoClose: 1000, pauseOnHover: false });

            // Reload the window after a delay to reflect changes
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'An error occurred while deleting post');
        }
    };

    return (
        <div className='w-full bg-n-1 border border-transparent dark:border-gray-700 dark:bg-gray-800 flex flex-col lg:flex-row p-4 shadow mt-4 rounded-lg justify-start lg:items-center'>
            <div className='flex text-n-8 dark:text-n-1 text-left lg:w-[30%]'>
                <h2 className='text-lg'>{post.from}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{post.to}</h2>
            </div>
            <div className='flex flex-col lg:flex-row my-3 lg:my-0 w-full lg:w-[50%] justify-around text-n-8 dark:text-n-1'>
                <h2 className='text-lg body-2 min-w-[150px] mx-2'><span className='font-bold'>Date:</span>&nbsp;{date}</h2>
                <h2 className='text-lg body-2 min-w-[150px] mx-2'><span className='font-bold'>Price:</span>&nbsp;{post.price}</h2>
                <h2 className='text-lg body-2 min-w-[150px] mx-2'><span className='font-bold'>Capacity:</span>&nbsp;{post.capacity}</h2>
            </div>
            {isOngoing && (
                <div className='w-[15%] flex justify-end items-center'>
                    <div className='w-max bg-red-600 p-2 rounded-lg hover:bg-red-700 border border-red-600 hover:cursor-pointer' onClick={handleDelete}>
                        <MdDelete size={25} color='white'/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryPost;
