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
                    if (sortDirection === 'asc') return new Date(a.dateAdded) - new Date(b.dateAdded);
                    else return new Date(b.dateAdded) - new Date(a.dateAdded);
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
        <div className='w-full bg-[#f8f8f8] min-h-[100vh]'>
            <div className='flex flex-col items-center'>
                <div className='flex mt-5 w-[90%]'>
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
                                    <div className='border border-n-8/10 rounded-xl px-10 py-5 bg-n-1 w-full'>
                                        <div className="flex items-center justify-between text-n-8 mt-3 mb-3 mx-4">
                                            <div className='w-[33%] flex justify-between font-bold'>
                                                <span className='min-w-[100px]'>From</span>
                                                <span className='min-w-[100px]'>To</span>
                                            </div>
                                            <div className='w-[30%] flex justify-between ml-[3rem]'>
                                                <button className={`mr-4 font-bold ${sortBy === 'date-added' && 'text-sky-600'}`} onClick={() => handleSortByChange('date-added')}>Date Added</button>
                                                <button className={`mr-4 font-bold ${sortBy === 'price' && 'text-sky-600'}`} onClick={() => handleSortByChange('price')}>Price</button>
                                                <button className={`font-bold ${sortBy === 'capacity' && 'text-sky-600'}`} onClick={() => handleSortByChange('capacity')}>Capacity</button>
                                            </div>
                                                <button onClick={handleSortDirectionChange} className='w-[15%] flex items-center justify-end'>{sortDirection === 'asc' ? '▼' : '▲'}</button>
                                        </div>
                                        <div className=' mx-auto float-left w-[98%]'>              
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
