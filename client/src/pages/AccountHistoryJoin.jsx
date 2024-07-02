import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { registration } from '../assets';
import AccountHeader from '../components/AccountHeader';
import { FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';
import { useFetchPostsQuery } from '../slices/apiSlice';

const ExplanatoryBox = ({ title, content, icon }) => (
  <div className='p-5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg flex items-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'>
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
      title="Understanding Joined Trips"
      content="This section shows the trips you have joined. You can review the trip details, including the date, capacity, and price."
      icon={<FaQuestionCircle />}
    />
    <ExplanatoryBox
      title="Accepted Trips"
      content="View trips you have joined and accepted. Ensure all details are correct before the trip date."
      icon={<FaCheckCircle />}
    />
  </div>
);

const AccountHistoryJoin = () => {
  const { data: posts, isLoading, isError, refetch } = useFetchPostsQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    refetch(); // Fetch posts when the component mounts
  }, [refetch]);

  const [sortedPosts, setSortedPosts] = useState([]);
  const [sortBy, setSortBy] = useState('date-added'); // Default sort by date-added
  const [sortDirection, setSortDirection] = useState('asc');

  // Sort and filter posts when posts or sorting criteria change
  useEffect(() => {
    if (posts) {
      // Filter posts to include only those where the user has made a reservation
      let userPosts = posts.filter(post =>
        post.reservations.some(reservation => reservation === userInfo._id)
      );

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

  const headerElements = [
    { label: 'Home', link: '/' },
    { label: 'Account', link: '/account' },
    { label: 'Joined Trips' }
  ];

  return (
    <div className="w-full min-h-screen text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="container mx-auto px-4 mt-15">
          <AccountHeader elements={headerElements} />
          <div className="flex flex-col lg:flex-row my-10">
            <div className="w-full lg:w-[75%] flex flex-wrap">
              <div className="flex flex-col justify-between items-center w-full relative">
                {/* Sort bar */}
                <div className="container w-[90%] rounded-lg mb-5 bg-gray-200 dark:bg-gray-800 p-4 flex items-center justify-between">
                  <label htmlFor="sortBy" className="text-gray-800 dark:text-gray-200 font-medium mr-2 hidden lg:block">Sort By:</label>
                  <div className="flex items-center mx-auto lg:mx-0">
                    <select
                      id="sortBy"
                      value={sortBy}
                      onChange={(e) => handleSortByChange(e.target.value)}
                      className="px-4 py-2 border text-sm lg:text-md border-gray-400 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
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
                  <h1 className="text-2xl font-bold py-2">No Joined Trips</h1>
                )}
                {sortedPosts.length > 0 && (
                  <div className="container grid grid-cols-1 gap-10">
                    {sortedPosts.map((post) => (
                      <div key={post._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="relative">
                          <img
                            src={registration} // Assuming you have an image URL
                            alt="Reservation"
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-black shadow text-white px-2 py-1 rounded-lg text-sm">
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{post.from} - {post.to}</h3>
                          <div className="space-y-2">
                            <div>
                              <p className="text-gray-800 dark:text-gray-200"><strong>Name:</strong> {post.publisher.name} {post.publisher.surname}</p>
                              <p className="text-gray-800 dark:text-gray-200"><strong>Email:</strong> {post.publisher.email}</p>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200"><strong>Capacity:</strong> {post.capacity}</p>
                            <p className="text-gray-800 dark:text-gray-200"><strong>Price:</strong> {post.price}</p>
                            <p className="text-gray-800 dark:text-gray-200"><strong>Reservations:</strong> {post.reservations.length}</p>
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

export default AccountHistoryJoin;
