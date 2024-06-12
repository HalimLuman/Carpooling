import React, { useEffect, useState } from 'react';
import { useFetchPostsQuery } from '../slices/usersApiSlice';
import HistoryPost from '../components/HistoryPost';
import { useSelector } from 'react-redux';

const History = () => {
    const { data: posts, isLoading, isError, refetch } = useFetchPostsQuery();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        refetch(); // Fetch posts when the component mounts
    }, [refetch]);

    const [sortedPosts, setSortedPosts] = useState([]);
    const [sortBy, setSortBy] = useState('date-added'); // Default sort by date-added
    const [sortDirection, setSortDirection] = useState('asc');

    // Sort posts when posts or sorting criteria change
    useEffect(() => {
        if (posts) {
            let sorted = [...posts];
            if (sortBy === 'date-added') {
                sorted = sorted.sort((a, b) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    if (sortDirection === 'asc') return dateA - dateB;
                    else return dateB - dateA;
                  });
            } else if (sortBy === 'price') {
                sorted = sorted.sort((a, b) => {
                    if (sortDirection === 'asc') return a.price - b.price;
                    else return b.price - a.price;
                });
            } else if (sortBy === 'capacity') {
                sorted = sorted.sort((a, b) => {
                    if (sortDirection === 'asc') return a.capacity - b.capacity;
                    else return b.capacity - a.capacity;
                });
            }
            setSortedPosts(sorted);
        }
    }, [posts, sortBy, sortDirection]);

    const handleSortByChange = (sortByValue) => {
        setSortBy(sortByValue);
    };

    const handleSortDirectionChange = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      };

    return (
        <div className='w-full min-h-[90vh]'>
            <div className='flex flex-col items-center p-5'>
                <div className='flex mt-5 w-full'>
                    <div className="w-full flex flex-wrap">
                        <div className='flex justify-between items-center w-full mr-5 relative'>
                            {isLoading && <p>Loading...</p>}
                            {isError && <p>Error fetching posts</p>}
                            {sortedPosts.length === 0 && !isLoading && !isError && (
                                <h1 className="text-n-8 text-2xl font-bold py-2">No Posts Available</h1>
                            )}
                            {sortedPosts.length > 0 && (
                                <div className='flex flex-col w-full'>
                                    <div className='flex'>
                                        <div className='px-5 py-4 bg-n-1 rounded-lg mb-5 mx-2 shadow'>
                                            <h1 className="text-n-8 text-xl font-bold px-4 py-2">Travels Created: {sortedPosts.length}</h1>
                                        </div>
                                        <div className='px-5 py-4 bg-n-1 rounded-lg mb-5 shadow'>
                                            <h1 className="text-n-8 text-xl font-bold px-4 py-2">Travels Joined: 0</h1>
                                        </div>
                                    </div>
                                    <div className='py-5 bg-n-1 w-full'>
                                    <div className="container rounded-lg mb-5 bg-gray-800 p-4 flex items-center justify-between">
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
                                        <div className=' mx-auto float-left w-full'>              
                                            {sortedPosts.map(post => (
                                                <HistoryPost key={post._id} post={post} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;
