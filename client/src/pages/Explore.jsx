import React, { useEffect, useState } from 'react';
import { useFetchPostsQuery } from '../slices/usersApiSlice';
import Post from '../components/Post';
import NavbarExplore from '../components/NavbarExplore';
import Filter from '../components/Filter';
import { usePostSearch } from '../context/PostFilter';
import { FaSortAmountDown } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const Explore = () => {
    const { data: posts, isLoading, isError, refetch } = useFetchPostsQuery();
    const { searchCriteria } = usePostSearch();
    const [filters, setFilters] = useState({ min: 0, max: 0, cigaretteAllowed: false, petsAllowed: false, sortOrder: '' });
    const [sortLabel, setSortLabel] = useState("Select");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 10;

    useEffect(() => {
        refetch(); // Fetch posts when the component mounts
    }, [refetch]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to the first page when filters change
    };

    const handleSortChange = (sortOrder) => {
        setFilters({ ...filters, sortOrder });
        setDropdownVisible(false);
        if (sortOrder === 'asc') {
            setSortLabel("Low to High");
        } else if (sortOrder === 'desc') {
            setSortLabel("High to Low");
        } else {
            setSortLabel("Select");
        }
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const filteredPosts = posts ? posts.filter(post => {
        const { from, to, date } = searchCriteria;
        const { min, max, cigaretteAllowed, petsAllowed } = filters;

        const matchesSearchCriteria = 
            post.from.toLowerCase().includes(from.toLowerCase()) &&
            post.to.toLowerCase().includes(to.toLowerCase()) &&
            post.date.includes(date);

        const matchesPriceRange = 
            (!min || post.price >= min) && 
            (!max || post.price <= max);

        const matchesCigaretteAllowed = 
            !cigaretteAllowed || post.cigaretteAllowed === cigaretteAllowed;

        const matchesPetsAllowed = 
            !petsAllowed || post.petsAllowed === petsAllowed;

        return matchesSearchCriteria && matchesPriceRange && matchesCigaretteAllowed && matchesPetsAllowed;
    }) : [];

    const sortedPosts = filters.sortOrder === 'asc' 
        ? filteredPosts.sort((a, b) => a.price - b.price)
        : filters.sortOrder === 'desc' 
            ? filteredPosts.sort((a, b) => b.price - a.price)
            : filteredPosts;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <NavbarExplore />
            <div className='w-full bg-gray-100 min-h-screen'>
                <div className='flex flex-col items-center pt-[10rem] container'>
                    <div className='flex flex-col md:flex-row mt-5 w-full'>
                        <div className='w-full md:w-1/3'>
                            <Filter onFilterChange={handleFilterChange} />
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col items-center justify-center md:ml-7">
                            {sortedPosts.length > 0 && (
                                <div className='flex w-full justify-between items-center mb-4'>
                                    <h2 className='text-2xl font-bold text-gray-800'>Explore Rides</h2>
                                    <div className="relative text-n-8 min-w-[150px]">
                                        <button onClick={toggleDropdown} className="flex items-center justify-center border rounded px-2 py-1 w-full">
                                            <FaSortAmountDown className="mr-2" color='gray' />
                                            <h3 className='text-sm'>Sort: <span className='text-sm font-bold'>{sortLabel}</span></h3>
                                        </button>
                                        {dropdownVisible && (
                                            <div className="absolute bg-white mt-2 w-full border rounded-md text-center z-10">
                                                <div className="flex items-center hover:bg-gray-200 cursor-pointer w-full justify-center py-2" onClick={() => handleSortChange('asc')}>
                                                    <h3 className='text-sm'>Price: low to high</h3>
                                                </div>
                                                <div className="flex items-center hover:bg-gray-200 cursor-pointer w-full justify-center py-2" onClick={() => handleSortChange('desc')}>
                                                    <h3 className='text-sm'>Price: high to low</h3>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {isLoading && <p>Loading...</p>}
                            {isError && <p>Error fetching posts</p>}
                            {sortedPosts.length === 0 && <h1 className="text-n-8 text-2xl font-bold px-4 py-2">No Posts Available</h1>}
                            {sortedPosts.length > 0 && <h1 className="text-n-8 text-2xl font-bold px-4 py-2">Search Results: {sortedPosts.length}</h1>}
                            {currentPosts.map(post => (
                                <Post key={post._id} post={post} />
                            ))}
                            {
                                sortedPosts.length > 0 && (
                                    <div className='flex justify-center py-4 items-center'>
                                        <MdKeyboardArrowLeft 
                                            color='black' 
                                            size={30} 
                                            onClick={goToPreviousPage} 
                                            className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                        />
                                        <div className='mx-10'>         
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handlePageChange(index + 1)}
                                                    className={`w-[40px] h-[40px] mx-1 border rounded-full ${currentPage === index + 1 ? 'bg-n-8 text-white' : 'text-n-8 hover:border-n-8'}`}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                        </div>
                                        <MdKeyboardArrowRight 
                                            color='black' 
                                            size={30} 
                                            onClick={goToNextPage} 
                                            className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                        />
                                    </div>
                                )
                            }
                        </div>
                   
                        </div>
                </div>
            </div>
        </>
    );
};

export default Explore;
