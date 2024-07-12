import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useFetchPostsQuery } from "../../slices/usersApiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import HistoryPost from "../../components/HistoryPost";
import { useTranslation } from 'react-i18next'

const History = () => {
  const { data: posts, isLoading, isError, refetch } = useFetchPostsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const [historyPosts, setHistoryPosts] = useState([]);
  const [joinedPosts, setJoinedPosts] = useState([]);
  const [historyPage, setHistoryPage] = useState(1);
  const [joinedPage, setJoinedPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    refetch();
  }, [refetch, userInfo?.posts]);

  useEffect(() => {
    if (!posts) return;

    const userPosts = posts.filter((post) => userInfo?.posts?.includes(post._id));
    const currentDate = new Date().getTime();
    const joinedPosts = posts.filter((post) => userInfo?.joinedPosts?.includes(post._id));

    const history = userPosts.filter(
      (post) => new Date(post.date).getTime() < currentDate
    );

    setHistoryPosts(history);
    setJoinedPosts(joinedPosts);
  }, [posts, userInfo?.posts, userInfo?.joinedPosts]);

  const handleHistoryPageChange = (page) => setHistoryPage(page);
  const handleJoinedPageChange = (page) => setJoinedPage(page);

  const paginatedHistoryPosts = useMemo(() => {
    const startIndex = (historyPage - 1) * itemsPerPage;
    return historyPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [historyPage, historyPosts]);

  const paginatedJoinedPosts = useMemo(() => {
    const startIndex = (joinedPage - 1) * itemsPerPage;
    return joinedPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [joinedPage, joinedPosts]);

  const totalPagesHistory = useMemo(() => Math.ceil(historyPosts.length / itemsPerPage), [historyPosts.length]);
  const totalPagesJoined = useMemo(() => Math.ceil(joinedPosts.length / itemsPerPage), [joinedPosts.length]);
  
  return (
    <div className="w-full text-white rounded-lg mt-5">
      <div className="flex flex-col items-center w-[90%] mx-auto">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col sm:flex-row lg:gap-5 text-n-8 dark:text-n-1">
            <div className="w-[250px] flex justify-center px-5 py-4 dark:bg-neutral-900 rounded-lg mb-5 sm:mx-2 border border-neutral-600">
              <h1 className="text-base py-1 text-center">
                {t("DASHBOARD.History.completed")}{": "}{historyPosts.length}
              </h1>
            </div>
            <div className="w-[250px] flex justify-center px-5 py-4 dark:bg-neutral-900 rounded-lg mb-5 sm:mx-2 border border-neutral-600">
              <h1 className="text-base py-1 text-center">
              {t("DASHBOARD.History.joined")}{": "}{joinedPosts.length}
              </h1>
            </div>
          </div>

          <div className="flex justify-center items-center w-full relative">
            {isLoading && (
              <div className="w-full">
                <Skeleton height={30} count={5} />
              </div>
            )}
            {isError && <p>Error fetching travels</p>}
            {historyPosts.length === 0 && !isLoading && !isError && (
              <div className="text-center py-10">
                <h1 className="text-neutral-800 dark:text-white text-xl lg:text-2xl font-bold py-2">{t("DASHBOARD.History.notFoundCreatedTitle")}</h1>
                <p className="text-neutral-600 dark:text-neutral-200 text-xs lg:text-sm my-2">{t("DASHBOARD.History.notFoundCreatedText")}</p>
                <Link to="/dashboard/create-post" className="mt-5 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">{t("DASHBOARD.History.notFoundCreatedButton")}</Link>
              </div>
            )}
            {historyPosts.length > 0 && (
              <div className="flex flex-col w-full">
                <div className="py-5 w-full rounded-lg">
                  <h1 className="text-neutral-800 dark:text-white text-2xl lg:text-3xl p-2 lg:mb-4">{t("DASHBOARD.History.completed")}</h1>
                  <Suspense fallback={<Skeleton height={30} count={5} />}>
                    {paginatedHistoryPosts.map((post) => (
                      <HistoryPost key={post._id} post={post} isOngoing={false} />
                    ))}
                  </Suspense>
                  {totalPagesHistory > 1 && (
                    <div className="flex justify-center mt-4">
                      {[...Array(totalPagesHistory).keys()].map((page) => (
                        <button
                          key={page + 1}
                          onClick={() => handleHistoryPageChange(page + 1)}
                          className={`px-3 py-1 rounded-lg mr-2 ${historyPage === page + 1 ? "bg-blue-500 text-white" : "bg-gray-700 text-white/80 hover:bg-blue-600"}`}
                        >
                          {page + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <hr className="w-full dark:border-gray-700" />
          <div className="flex justify-center items-center w-full lg:mr-5 relative">
            {isLoading && (
              <div className="w-full">
                <Skeleton height={30} count={5} />
              </div>
            )}
            {isError && <p>Error fetching travels</p>}
            {joinedPosts.length === 0 && !isLoading && !isError && (
              <div className="text-center py-10 w-full">
                <h1 className="text-neutral-800 dark:text-white text-xl lg:text-2xl font-bold py-2">{t("DASHBOARD.History.notFoundJoinedTitle")}</h1>
                <p className="text-neutral-600 dark:text-neutral-200 text-xs lg:text-sm my-2]">{t("DASHBOARD.History.notFoundJoinedText")}</p>
                <Link to="/explore" className="mt-5 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">{t("DASHBOARD.History.notFoundJoinedButton")}</Link>
              </div>
            )}
            {joinedPosts.length > 0 && (
              <div className="mx-auto float-left w-full mt-8">
                <h2 className="text-neutral-800 dark:text-white text-2xl lg:text-3xl p-2 lg:mb-4">{t("DASHBOARD.History.joined")}</h2>
                <Suspense fallback={<Skeleton height={30} count={5} />}>
                  {paginatedJoinedPosts.map((post) => (
                    <HistoryPost key={post._id} post={post} isOngoing={false} />
                  ))}
                </Suspense>
                {totalPagesJoined > 1 && (
                  <div className="flex justify-center mt-4">
                    {[...Array(totalPagesJoined).keys()].map((page) => (
                      <button
                        key={page + 1}
                        onClick={() => handleJoinedPageChange(page + 1)}
                        className={`px-3 py-1 rounded-lg mr-2 ${joinedPage === page + 1 ? "bg-blue-500 text-white" : "bg-gray-700 text-white/80 hover:bg-blue-600"}`}
                      >
                        {page + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
