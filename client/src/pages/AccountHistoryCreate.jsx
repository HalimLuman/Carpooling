import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { registration } from '../assets';
import AccountHeader from '../components/AccountHeader';
import { FaQuestionCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useFetchPostsQuery, useDeletePostMutation } from '../slices/usersApiSlice';

const ExplanatoryBox = ({ title, content, icon }) => (
  <div className='p-5 border rounded-lg shadow-lg flex items-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'>
    <div className='mr-4 p-4 rounded-full bg-white dark:bg-gray-700 text-2xl text-gray-800 dark:text-gray-200'>
      {icon}
    </div>
    <div>
      <h2 className='text-lg font-bold mb-2'>{title}</h2>
      <p>{content}</p>
    </div>
  </div>
);

const ExplanatoryBoxes = () => (
  <div className='grid grid-cols-1 gap-6'>
    <ExplanatoryBox
      title="Managing Your Created Trips"
      content="View and manage the trips you've created. You can see details about each trip and the reservations made by other users."
      icon={<FaQuestionCircle />}
    />
    <ExplanatoryBox
      title="Reservations on Your Trips"
      content="Check the reservations that users have made on your created trips. Make sure to keep track of all reservations and respond promptly."
      icon={<FaCheckCircle />}
    />
    <ExplanatoryBox
      title="Trip Updates"
      content="Update the details of your created trips if needed. Keep your trips' information accurate and up-to-date to ensure a smooth experience for all users."
      icon={<FaTimesCircle />}
    />
  </div>
);

const AccountHistoryCreate = () => {
  const { data: posts, isLoading, isError, refetch } = useFetchPostsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [deletePost] = useDeletePostMutation();

  useEffect(() => {
    refetch(); // Fetch posts when the component mounts
  }, [refetch]);

  const [sortedPosts, setSortedPosts] = useState([]);
  const [sortBy, setSortBy] = useState('date-added'); // Default sort by date-added
  const [sortDirection, setSortDirection] = useState('asc');

  // Sort and filter posts when posts or sorting criteria change
  useEffect(() => {
    if (posts) {
      // Filter posts to include only those created by the current user
      let userPosts = posts.filter(post => post.publisher.email === userInfo.email);

      // Sort the filtered posts
      let sorted = [...userPosts];
      if (sortBy === 'date-added') {
        sorted = sorted.sort((a, b) => {
          const dateA = new Date(a.dateAdded).getTime();
          const dateB = new Date(b.dateAdded).getTime();
          return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });
      } else if (sortBy === 'price') {
        sorted = sorted.sort((a, b) => {
          return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
        });
      } else if (sortBy === 'capacity') {
        sorted = sorted.sort((a, b) => {
          return sortDirection === 'asc' ? a.capacity - b.capacity : b.capacity - a.capacity;
        });
      }
      setSortedPosts(sorted);
    }
  }, [posts, sortBy, sortDirection, userInfo]);

  const handleSortByChange = (sortByValue) => {
    setSortBy(sortByValue);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      toast.success('Post Deleted successfully', { autoClose: 1000, pauseOnHover: false });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'An error occurred while deleting the post');
    }
  };

  const headerElements = [
    { label: 'Home', link: '/' },
    { label: 'Account', link: '/account' },
    { label: 'Created Trips' }
  ];

  return (
    <div className="w-full min-h-screen text-gray-800 dark:text-gray-200">
      <div className="flex flex-col items-center">
        <div className='container mx-auto px-4 text-gray-800 dark:text-gray-200 mt-15'>
          <AccountHeader elements={headerElements} />
          <div className="flex flex-col lg:flex-row my-10">
            <div className="w-full lg:w-[75%] flex flex-wrap">
              <div className="flex flex-col justify-between items-center w-full relative">
                {/* Sort bar */}
                <div className="container w-[100%] lg:w-[90%] rounded-lg mb-5 bg-gray-800 p-4 flex items-center justify-between">
                  <label htmlFor="sortBy" className="text-white font-medium mr-2 hidden lg:block">Sort By:</label>
                  <div className="flex items-center mx-auto lg:mx-0">
                    <select
                      id="sortBy"
                      value={sortBy}
                      onChange={(e) => handleSortByChange(e.target.value)}
                      className="px-4 py-2 border text-sm lg:text-md border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white font-medium"
                    >
                      <option value="date-added">Date Added</option>
                      <option value="price">Price</option>
                      <option value="capacity">Capacity</option>
                    </select>
                    <button
                      onClick={handleSortDirectionChange}
                      className="ml-2 px-6 py-2 bg-blue-500 text-sm lg:text-md text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-colors duration-300 ease-in-out"
                    >
                      {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                    </button>
                  </div>
                </div>
                {isLoading && <p className="text-lg">Loading...</p>}
                {isError && <p className="text-lg text-red-500">Error fetching posts</p>}
                {sortedPosts?.length === 0 && !isLoading && !isError && (
                  <h1 className="text-2xl font-bold py-2">No Created Trips</h1>
                )}
                {sortedPosts.length > 0 && (
                  <div className="lg:container grid grid-cols-1 gap-10 w-full">
                    {sortedPosts.map((post) => (
                      <div key={post._id} className="bg-white p-2 dark:bg-slate-800 rounded-xl shadow-md dark:shadow-white/20 overflow-hidden">
                        <div className="relative rounded-lg">
                          <img
                            src={registration} // Assuming you have an image URL
                            alt="Reservation"
                            className="w-full h-40 object-cover rounded-xl"
                          />
                          <div className="absolute flex justify-between items-center w-full top-0 px-2 shadow text-whiterounded-lg text-sm">
                            <div className=' bg-black px-3 py-2 text-md tracking-wider'>
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                            <div className="flex justify-end">
                            <button
                              onClick={() => handleDelete(post._id)}
                              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600 transition-colors duration-300 ease-in-out"
                            >
                              Delete
                            </button>
                          </div>
                          </div>
                        </div>
                        <div className="px-6 py-4">
                          <h3 className="text-lg font-semibold mb-2">{post.from} - {post.to}</h3>
                          <div className="space-y-1">
                            <p className="text-gray-600 dark:text-gray-300"><strong>Capacity:</strong> {post.capacity}</p>
                            <p className="text-gray-600 dark:text-gray-300"><strong>Price:</strong> {post.price}</p>
                            <p className="text-gray-600 dark:text-gray-300"><strong>Reservations:</strong> {post.reservations.length}</p>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-[30%]">
              <ExplanatoryBoxes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHistoryCreate;
