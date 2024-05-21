import React from 'react';
import NavbarMain from '../components/NavbarMain';
import { useLocation, useNavigate } from 'react-router-dom';

const PostInfo = () => {
    const location = useLocation();
    const post = location.state?.post;
    
    const navigate = useNavigate();

    // Format date
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

    if (!post) {
        return (
            <>
                <NavbarMain />
                <div className='container mx-auto mt-12 text-center'>
                    <p className='text-lg text-gray-700'>No post data available</p>
                </div>
            </>
        );
    }

    // Function to handle payment
    const handlePayment = () => {
        // Implement payment logic here, such as opening a payment modal or navigating to a payment page
        alert('Payment functionality to be implemented!');
    };

    const handlePostOwner = () => {
      navigate(`/dashboard/${post.publisher._id}`)
    }
    return (
        <>
            <NavbarMain />
            <div className='bg-gray-100 py-[6rem]'>
                <div className='container mx-auto px-4 flex flex-col items-center'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-8 text-gray-800'>{post.from} - {post.to}</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 w-full'>
                        <div className='bg-white rounded-lg shadow-md p-6 col-span-2 md:col-span-2 mb-7 lg:mb-0'>
                            <h2 className='text-xl md:text-2xl font-semibold mb-4 text-gray-800'>Trip Details</h2>
                            <div className='flex justify-between items-center mb-4'>
                                <p className='text-lg text-gray-700'>Date:</p>
                                <p className='text-lg text-gray-900'>{formatDate(post.date)}</p>
                            </div>
                            <div className='flex justify-between items-center mb-4'>
                                <p className='text-lg text-gray-700'>Departure Time:</p>
                                <p className='text-lg text-gray-900'>{post.time}</p>
                            </div>
                            <div className='flex justify-between items-center mb-4'>
                                <p className='text-lg text-gray-700'>Trip Duration:</p>
                                <p className='text-lg text-gray-900'>{3} hours</p>
                            </div>
                            <div className='flex justify-between items-center mb-4'>
                                <p className='text-lg text-gray-700'>Available Seats:</p>
                                <p className='text-lg text-gray-900'>{post.capacity}</p>
                            </div>
                            {/* Additional details */}
                            <div className='mt-6'>
                                <h2 className='text-xl md:text-2xl font-semibold mb-4 text-gray-800'>Additional Information</h2>
                                <div className='flex justify-between items-center'>
                                    <p className='text-lg text-gray-700'>Cigarettes Allowed:</p>
                                    <p className='text-lg text-gray-900'>{post.cigarettesAllowed ? 'Yes' : 'No'}</p>
                                </div>
                                <div className='flex justify-between items-center mt-2'>
                                    <p className='text-lg text-gray-700'>Pets Allowed:</p>
                                    <p className='text-lg text-gray-900'>{post.petsAllowed ? 'Yes' : 'No'}</p>
                                </div>
                                {/* Add more additional information as needed */}
                            </div>
                        </div>
                        <div className='bg-white rounded-lg shadow-md p-6 col-span-3 lg:col-span-1'>
                            <div>
                                <h2 className='text-xl md:text-2xl font-semibold mb-4 text-gray-800'>Payment</h2>
                                <p className='text-lg text-gray-700 mb-2'>Total Price: {post.price} MKD</p>
                                {/* Add more payment info if needed */}
                                <button onClick={handlePayment} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full mb-4">
                                    Proceed to Payment
                                </button>
                                <p className='text-sm text-gray-600'>For inquiries, please contact:</p>
                                <p className='text-lg text-gray-900'>{post.publisher.email}</p>
                                {/* Add more contact info if needed */}
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6 mt-8 w-full'>
                        <h2 className='text-xl md:text-2xl font-semibold mb-4 text-gray-800'>Car Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <div>
                                    <p className='text-lg text-gray-700 font-semibold'>Model</p>
                                    <p className='text-sm text-gray-500'>Audi A6</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <div>
                                    <p className='text-lg text-gray-700 font-semibold'>Color</p>
                                    <p className='text-sm text-gray-500'>Black</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-700" fill="none"
viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
</svg>
<div>
<p className='text-lg text-gray-700 font-semibold'>Year</p>
<p className='text-sm text-gray-500'>2022</p>
</div>
</div>
<div className="flex items-center">
<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
</svg>
<div>
<p className='text-lg text-gray-700 font-semibold'>Fuel Type</p>
<p className='text-sm text-gray-500'>Petrol</p>
</div>
</div>
</div>
</div>
{/* Post owner's info */}
<div className='bg-white rounded-lg shadow-md p-6 mt-8 w-full '>
<h2 className='text-xl md:text-2xl font-semibold mb-2 text-gray-800'>Post Owner</h2>
<div className='flex items-center p-3 rounded-md hover:bg-gray-200 cursor-pointer' onClick={handlePostOwner}>
<img src={post.publisher.profilePic} alt='Profile' className='w-12 h-12 rounded-full mr-4' />
<div className='ml-2'>
<p className='text-lg text-gray-700'>{post.publisher.name} {post.publisher.surname}</p>
<p className='text-sm text-gray-600'>{post.publisher.email}</p>
</div>
</div>
</div>
</div>
</div>
</>
);  
};

export default PostInfo;
