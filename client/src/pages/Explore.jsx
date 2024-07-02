import React, { useEffect, useState } from "react";
import { useFetchPostsQuery } from "../slices/usersApiSlice";
import Post from "../components/Post";
import NavbarMain from "../components/NavbarMain";
import Filter from "../components/Filter";
import { FaSearch, FaSortAmountDown } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const Explore = () => {
  const { data: posts, refetch } = useFetchPostsQuery();
  const [filters, setFilters] = useState({
    min: 0,
    max: 0,
    cigaretteAllowed: false,
    petsAllowed: false,
    sortOrder: "",
  });
  const [sortLabel, setSortLabel] = useState("Select");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [search, setSearch] = useState({ from: "", to: "", date: "" });
  const [tempSearch, setTempSearch] = useState({ from: "", to: "", date: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(false);

  const postsPerPage = 10;

  useEffect(() => {
    refetch(); // Fetch posts when the component mounts
  }, [refetch]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setTempSearch({ ...tempSearch, [name]: value });
  };

  const handleSortChange = (sortOrder) => {
    setFilters({ ...filters, sortOrder });
    setDropdownVisible(false);
    if (sortOrder === "asc") {
      setSortLabel("Low to High");
    } else if (sortOrder === "desc") {
      setSortLabel("High to Low");
    } else {
      setSortLabel("Select");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const applyFiltersAndSearch = () => {
    setSearch(tempSearch);
  };

  const filteredPosts = posts
    ? posts.filter((post) => {
        const { from, to, date } = search;
        const { min, max, cigaretteAllowed, petsAllowed } = filters;

        const matchesSearchCriteria =
          post.from.toLowerCase().includes(from.toLowerCase()) &&
          post.to.toLowerCase().includes(to.toLowerCase()) &&
          post.date.includes(date);

        const matchesPriceRange =
          (!min || post.price >= min) && (!max || post.price <= max);

        const matchesCigaretteAllowed =
          !cigaretteAllowed || post.cigaretteAllowed === cigaretteAllowed;

        const matchesPetsAllowed =
          !petsAllowed || post.petsAllowed === petsAllowed;

        return (
          matchesSearchCriteria &&
          matchesPriceRange &&
          matchesCigaretteAllowed &&
          matchesPetsAllowed
        );
      })
    : [];

  const sortedPosts =
    filters.sortOrder === "asc"
      ? filteredPosts.sort((a, b) => a.price - b.price)
      : filters.sortOrder === "desc"
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
      <NavbarMain />
      <div className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col items-center pt-[6rem] container">
          <div className="flex flex-col md:flex-row mt-5 w-full">
            <div className="w-full md:w-1/3 mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-5">
                <div className="flex items-center mb-4">
                  <div className="relative w-full">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                    <input
                      type="text"
                      name="from"
                      value={tempSearch.from}
                      onChange={handleSearchChange}
                      placeholder="Location"
                      className="border border-gray-300 dark:border-gray-700 bg-n-1 dark:bg-gray-700 text-gray-700 dark:text-gray-100 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                    />
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="relative w-full">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                    <input
                      type="text"
                      name="to"
                      value={tempSearch.to}
                      onChange={handleSearchChange}
                      placeholder="Destination"
                      className="border border-gray-300 dark:border-gray-700 bg-n-1 dark:bg-gray-700 text-gray-700 dark:text-gray-100 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                    />
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="relative w-full">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                    <input
                      type="date"
                      name="date"
                      value={tempSearch.date}
                      onChange={handleSearchChange}
                      placeholder="Date"
                      className="border border-gray-300 dark:border-gray-700 bg-n-1 dark:bg-gray-700 text-gray-700 dark:text-gray-100 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                    />
                  </div>
                </div>
                <button
                  onClick={applyFiltersAndSearch}
                  className="bg-black dark:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out mr-2 hover:bg-sky-600 w-full"
                >
                  Submit
                </button>
              </div>
              {filter ? (
                <Filter onFilterChange={handleFilterChange} filter={filter} />
              ) : null}
            </div>

            <div className="w-full md:w-2/3 flex flex-col items-center justify-center md:ml-7">
              <div className={`flex flex-col lg:flex-row w-full ${sortedPosts.length > 0 ? 'justify-between' : 'justify-end'} items-center mb-4 relative right-0`}>
                {sortedPosts.length > 0 && (
                  <h1 className="text-n-8 dark:text-gray-100 text-2xl font-bold px-4 py-2">
                    Search Results: {sortedPosts.length}
                  </h1>
                )}
                <div className="relative text-n-8 dark:text-gray-100 min-w-[300px] flex gap-2">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-center rounded px-2 py-1 w-full shadow dark:bg-gray-700 bg-n-1 border border-transparent transform hover:shadow-md dark:hover:shadow-white/50 dark:shadow-sm duration-500"
                  >
                    <FaSortAmountDown className="mr-2" color="gray" />
                    <h3 className="text-sm flex flex-col">
                      Sort:{" "}
                      <span className="text-sm font-bold">{sortLabel}</span>
                    </h3>
                  </button>
                  <button
                    onClick={() => setFilter(!filter)}
                    className="flex items-center justify-center rounded px-2 py-1 w-full shadow dark:bg-gray-700 bg-n-1 border border-transparent transform hover:shadow-md dark:hover:shadow-white/50 dark:shadow-sm duration-500"
                  >
                    <FaSortAmountDown className="mr-2" color="gray" />
                    <h3 className="text-sm">Filters</h3>
                  </button>
                  {dropdownVisible && (
                    <div className="absolute bg-white dark:bg-gray-800 mt-15 w-1/2 border rounded-md text-center z-10 border-gray-300 dark:border-gray-700">
                      <div
                        className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer w-full justify-center py-2 pt-3"
                        onClick={() => handleSortChange("asc")}
                      >
                        <h3 className="text-sm text-gray-700 dark:text-gray-100">
                          Low to High
                        </h3>
                      </div>
                      <div
                        className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer w-full justify-center py-2 pb-3"
                        onClick={() => handleSortChange("desc")}
                      >
                        <h3 className="text-sm text-gray-700 dark:text-gray-100">
                          High to Low
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {sortedPosts.length > 0 ? (
                <>
                  {currentPosts.map((post) => (
                    <Post key={post._id} post={post} />
                  ))}
                  <div className="flex justify-center py-4 items-center">
                    <MdKeyboardArrowLeft
                      size={30}
                      onClick={goToPreviousPage}
                      className={`${
                        currentPage === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      } dark:text-n-1 text-n-8`}
                    />
                    <div className="mx-10">
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={`w-[40px] h-[40px] mx-1 border rounded-full ${
                            currentPage === index + 1
                              ? "bg-n-8 dark:bg-gray-700 text-white"
                              : "text-n-8 dark:text-gray-100 hover:border-n-8 dark:hover:border-gray-700"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    <MdKeyboardArrowRight
                      size={30}
                      onClick={goToNextPage}
                      className={`${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      } dark:text-n-1 text-n-8`}
                    />
                  </div>
                </>
              ) : (
                <h1 className="h4 font-bold text-n-8 dark:text-gray-100">
                  No Rides Available on this criteria
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
