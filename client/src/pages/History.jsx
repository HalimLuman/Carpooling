import React, { useEffect, useState } from 'react';
import { useFetchPostsQuery } from '../slices/usersApiSlice';
import HistoryPost from '../components/HistoryPost';
import { useSelector } from 'react-redux';

const History = () => {
    const { data: posts, isLoading, isError, refetch } = useFetchPostsQuery();
    const { userInfo } = useSelector((state) => state.auth);

    const [historyPosts, setHistoryPosts] = useState([]);
    const [joined, setJoinedPosts] = useState([]);
    const [sortBy, setSortBy] = useState('date-added'); // Default sort by date-added
    const [sortDirection, setSortDirection] = useState('asc');
    const [historyPage, setHistoryPage] = useState(1);
    const [joinedPage, setJoinedPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch posts when the component mounts or userInfo.posts changes
    useEffect(() => {
        refetch();
    }, [refetch, userInfo.posts]);

    // Sort and categorize posts when posts or sorting criteria change
    useEffect(() => {
        if (!posts) return;

        const userPosts = posts.filter(post => userInfo.posts.includes(post._id));
        const currentDate = new Date().getTime();
        let history = [];
        const joined = posts.filter(post => userInfo.joinedPosts.includes(post._id));

        userPosts.forEach(post => {
            const postDate = new Date(post.date).getTime();
            if (postDate < currentDate) {
                history.push(post);
            }
        });

        const sortPosts = (postsArray) => {
            return postsArray.sort((a, b) => {
                if (sortBy === 'date-added') {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
                } else if (sortBy === 'price') {
                    return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
                } else if (sortBy === 'capacity') {
                    return sortDirection === 'asc' ? a.capacity - b.capacity : b.capacity - a.capacity;
                }
                return 0;
            });
        };

        setHistoryPosts(sortPosts(history));
        setJoinedPosts(sortPosts(joined));
    }, [posts, sortBy, sortDirection, userInfo.posts]);

    const handleSortByChange = (sortByValue) => {
        setSortBy(sortByValue);
    };

    const handleSortDirectionChange = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const handleHistoryPageChange = (page) => {
        setHistoryPage(page);
    };

    const handleJoinedPageChange = (page) => {
        setJoinedPage(page);
    };

    const renderPaginatedHistoryPosts = () => {
        const startIndex = (historyPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return historyPosts.slice(startIndex, endIndex).map(post => (
            <HistoryPost key={post._id} post={post} isOngoing={false} />
        ));
    };

    const renderPaginatedJoinedPosts = () => {
        const startIndex = (joinedPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return joined.slice(startIndex, endIndex).map(post => (
            <HistoryPost key={post._id} post={post} isOngoing={false} />
        ));
    };

    const totalPagesHistory = Math.ceil(historyPosts.length / itemsPerPage);
    const totalPagesJoined = Math.ceil(joined.length / itemsPerPage);

    return (
        <div className='w-full min-h-[90vh] text-white dark:bg-gray-800 rounded-lg'>
            <div className='flex flex-col items-center p-5'>
                <div className='flex mt-5 w-full'>
                    <div className="w-full flex flex-wrap">
                        <div className='flex justify-between items-center w-full lg:mr-5 relative'>
                            {isLoading && <p>Loading...</p>}
                            {isError && <p>Error fetching posts</p>}
                            {historyPosts.length === 0 && joined.length === 0 && !isLoading && !isError && (
                                <h1 className="text-n-8 dark:text-n-1 text-2xl font-bold py-2">No Posts Available</h1>
                            )}
                            {(historyPosts.length > 0 || joined.length > 0) && (
                                <div className='flex flex-col w-full text-n-8 dark:text-n-1'>
                                    <div className='flex'>
                                        <div className='px-5 py-4 dark:bg-gray-800 rounded-lg mb-5 mx-2 shadow dark:shadow-white/20'>
                                            <h1 className="text-xl font-bold px-4 py-2">Completed Travels: {historyPosts.length}</h1>
                                        </div>
                                        <div className='px-5 py-4 dark:bg-gray-800 rounded-lg mb-5 shadow dark:shadow-white/20'>
                                            <h1 className="text-xl font-bold px-4 py-2">Joined Travels: {joined.length}</h1>
                                        </div>
                                    </div>
                                    <div className='py-5 dark:bg-gray-800 w-full rounded-lg'>
                                        <div className="container rounded-lg mb-5 bg-gray-700 p-4 flex items-center justify-between">
                                            <label htmlFor="sortBy" className="text-white font-medium mr-2 hidden lg:block">Sort By:</label>
                                            <div className="flex items-center mx-auto lg:mx-0">
                                                <select
                                                    id="sortBy"
                                                    value={sortBy}
                                                    onChange={(e) => handleSortByChange(e.target.value)}
                                                    className="px-4 py-2 border text-sm lg:text-md border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-800 text-white font-medium cursor-pointer"
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
                                        <div className='mx-auto float-left w-full'>
                                            <h2 className="text-2xl mb-4">Completed Travels</h2>
                                            {renderPaginatedHistoryPosts()}
                                            {totalPagesHistory > 1 && (
                                                <div className="flex justify-center mt-4">
                                                    {[...Array(totalPagesHistory).keys()].map((page) => (
                                                        <button
                                                            key={page + 1}
                                                            onClick={() => handleHistoryPageChange(page + 1)}
                                                            className={`px-3 py-1 rounded-lg mr-2 ${
                                                                historyPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white/80 hover:bg-blue-600'
                                                            }`}
                                                        >
                                                            {page + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className='mx-auto float-left w-full mt-8'>
                                            <h2 className="text-2xl mb-4">Joined Travels</h2>
                                            {renderPaginatedJoinedPosts()}
                                            {totalPagesJoined > 1 && (
                                                <div className="flex justify-center mt-4">
                                                    {[...Array(totalPagesJoined).keys()].map((page) => (
                                                        <button
                                                            key={page + 1}
                                                            onClick={() => handleJoinedPageChange(page + 1)}
                                                            className={`px-3 py-1 rounded-lg mr-2 ${
                                                                joinedPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white/80 hover:bg-blue-600'
                                                            }`}
                                                        >
                                                            {page + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
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
