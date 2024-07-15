import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useFetchPostsQuery } from "../slices/usersApiSlice";
import Post from "../components/Post";
import Filter from '../components/Filter'
import { FaSearch, FaSortAmountDown } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { debounce } from "lodash";
import NavbarMain from "../components/NavbarMain";
import { useTranslation } from "react-i18next";

const Explore = () => {
  const { t } = useTranslation();
  const { data: posts, refetch } = useFetchPostsQuery();
  const [filters, setFilters] = useState({
    min: 0,
    max: 0,
    smoking: false,
    pets: false,
    sortOrder: "",
    capacity: 1,
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

  const debouncedSearchChange = useCallback(
    debounce((name, value) => {
      setTempSearch((prev) => ({ ...prev, [name]: value }));
    }, 50),
    []
  );

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    debouncedSearchChange(name, value);
  };

  const handleSortChange = (sortOrder) => {
    setFilters((prev) => ({ ...prev, sortOrder }));
    setDropdownVisible(false);
    setSortLabel(sortOrder === "asc" ? `${t("EXPLORE.lowHigh")}` : `${t("EXPLORE.highLow")}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const applyFiltersAndSearch = () => {
    setSearch(tempSearch);
  };

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
  
    const currentDateTime = new Date();
    return posts.filter((post) => {
      const { from, to, date } = search;
      const { min, max, smoking, pets, capacity } = filters;
  
      const postDate = new Date(post.date);
      if (postDate < currentDateTime.setHours(0, 0, 0, 0)) return false; // Filter out past dates

      const matchesSearchCriteria =
        post.from.toLowerCase().includes(from.toLowerCase()) &&
        post.to.toLowerCase().includes(to.toLowerCase()) &&
        post.date.includes(date);
  
      const matchesPriceRange =
        (!min || post.price >= min) && (!max || post.price <= max);
  
      const matchesCigaretteAllowed =
        !smoking || post.smoking === smoking;
  
      const matchesPetsAllowed =
        !pets || post.pets === pets;
  
      const matchesCapacity =
        post.capacity >= capacity; // Assuming post.capacity is the actual capacity of the post
  
      return (
        matchesSearchCriteria &&
        matchesPriceRange &&
        matchesCigaretteAllowed &&
        matchesPetsAllowed &&
        matchesCapacity
      );
    });
  }, [posts, search, filters]);

  const sortedPosts = useMemo(() => {
    return filters.sortOrder === "asc"
      ? filteredPosts.sort((a, b) => a.price - b.price)
      : filters.sortOrder === "desc"
      ? filteredPosts.sort((a, b) => b.price - a.price)
      : filteredPosts;
  }, [filteredPosts, filters.sortOrder]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <NavbarMain />
      <div className="w-full bg-gray-50 dark:bg-neutral-950 min-h-screen">
        <div className="flex flex-col items-center pt-[6rem] container">
          <div className="flex flex-col md:flex-row mt-5 w-full">
            <div className="w-full md:w-1/3 mb-4">
              <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 mb-5 w-[90%] lg:w-full mx-auto">
                <div className="flex items-center mb-4">
                  <div className="relative w-full">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                    <input
                      type="text"
                      name="from"
                      value={tempSearch.from}
                      onChange={handleSearchChange}
                      placeholder={`${t("EXPLORE.location")}`}
                      className="border border-gray-300 dark:border-neutral-800 bg-n-1 dark:bg-neutral-800 text-gray-700 dark:text-gray-100 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
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
                      placeholder={`${t("EXPLORE.destination")}`}
                      className="border border-gray-300 dark:border-neutral-800 bg-n-1 dark:bg-neutral-800 text-gray-700 dark:text-gray-100 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
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
                      placeholder={`${t("EXPLORE.date")}`}
                      className="border border-gray-300 dark:border-neutral-800 bg-n-1 dark:bg-neutral-800 text-gray-700 dark:text-gray-100 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                    />
                  </div>
                </div>
                <button
                  onClick={applyFiltersAndSearch}
                  className="bg-black dark:bg-neutral-500 text-n-1 dark:text-n-1 px-4 py-2 dark:hover:bg-sky-700 hover:bg-sky-700 rounded-lg w-full"
                >
                  {t("EXPLORE.submit")}
                </button>
              </div>
              {filter ? (
                <Filter onFilterChange={handleFilterChange} filter={filter} />
              ) : null}
            </div>

            <div className="w-full md:w-2/3 flex flex-col items-center justify-center md:ml-7">
              <div className={`flex flex-col lg:flex-row w-full justify-between gap-3 items-center mb-4 relative right-0`}>
                {sortedPosts.length > 0 && (
                  <h1 className="text-n-8 dark:text-gray-100 text-2xl font-bold px-4 py-2">
                  {t("EXPLORE.searchResult")}: {sortedPosts.length}
                  </h1>
                )}
                <div className="relative text-n-8 dark:text-gray-100 flex gap-2">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-center rounded py-1 w-[130px] shadow dark:bg-neutral-800 bg-n-1 border border-transparent hover:shadow-md dark:hover:shadow-white/30 dark:shadow-sm"
                  >
                    <FaSortAmountDown className="mr-2" color="gray" />
                    <h3 className="text-xs flex flex-col">
                    {t("EXPLORE.sort")}:{" "}
                      <span className="text-xs font-bold">{sortLabel}</span>
                    </h3>
                  </button>
                  <button
                    onClick={() => setFilter(!filter)}
                    className="flex items-center justify-center rounded py-1 w-[130px] shadow dark:bg-neutral-800 bg-n-1 border border-transparent hover:shadow-md dark:hover:shadow-white/30 dark:shadow-sm"
                  >
                    <FaSortAmountDown className="mr-2" color="gray" />
                    <h3 className="text-xs">{t("EXPLORE.filters")}</h3>
                  </button>
                  {dropdownVisible && (
                    <div className="absolute bg-white dark:bg-neutral-800 mt-15 w-1/2 border rounded-md text-center z-10 border-gray-300 dark:border-neutral-700">
                      <div
                        className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer w-full justify-center py-2 pt-3"
                        onClick={() => handleSortChange("asc")}
                      >
                        <h3 className="text-xs text-gray-700 dark:text-gray-100">
                        {t("EXPLORE.lowHigh")}
                        </h3>
                      </div>
                      <div
                        className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer w-full justify-center py-2 pb-3"
                        onClick={() => handleSortChange("desc")}
                      >
                        <h3 className="text-xs text-gray-700 dark:text-gray-100">
                        {t("EXPLORE.highLow")}
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
                          className={`w-[40px] h-[40px] mx-1 border rounded-lg ${
                            currentPage === index + 1
                              ? "bg-n-8 dark:bg-neutral-700 dark:border-neutral-600 text-white"
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
                {t("EXPLORE.notFound")}
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
