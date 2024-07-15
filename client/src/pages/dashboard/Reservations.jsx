import React, { useEffect, useState } from "react";
import {
  useFetchPendingRequestsQuery,
  useFetchPostsQuery,
  useHandleReservationRequestMutation,
} from "../../slices/usersApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import HistoryPost from "../../components/HistoryPost";
import { useTranslation } from "react-i18next";

const Reservations = () => {
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    refetch: refetchPosts,
  } = useFetchPostsQuery();
  const {
    data: pendingRequests,
    isLoading: pendingRequestsLoading,
    isError: pendingRequestsError,
    refetch: refetchPendingRequests,
  } = useFetchPendingRequestsQuery();
  const [handleRequest] = useHandleReservationRequestMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [ongoingPosts, setOngoingPosts] = useState([]);
  const [joinedPosts, setJoinedPosts] = useState([]);
  const navigate = useNavigate();

  const { t } = useTranslation();
  useEffect(() => {
    if (!posts) return;

    const currentDate = new Date().getTime();
    const userPosts = posts.filter((post) =>
      userInfo?.posts.includes(post._id)
    );
    const ongoing = userPosts.filter(
      (post) => new Date(post.date).getTime() >= currentDate
    );
    const joinedPosts = posts.filter(
      (post) => 
        userInfo?.joinedPosts.includes(post._id) && 
        new Date(post.date).getTime() >= currentDate
    );
    setJoinedPosts(joinedPosts);
    console.log(joinedPosts);
    setOngoingPosts(ongoing);
  }, [posts, userInfo?.posts, userInfo?.joinedPosts]);

  const handleAction = async (
    postId,
    userId,
    action,
    from,
    name,
    surname,
    email
  ) => {
    try {
      await handleRequest({ postId, userId, action }).unwrap();
      toast.success(
        `Reservation has been ${
          action === "accept" ? "accepted" : "rejected"
        } successfully.`
      );
      refetchPendingRequests();
      refetchPosts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to process reservation request.");
    }
  };

  const handleGoToProfile = (user) => {
    navigate(`/profiles/${user._id}`, { state: { postOwner: user } });
  };

  return (
    <div className="w-full h-full rounded-lg py-5">
      <div className="flex flex-col items-center w-[90%] mx-auto">
        <div className="flex mt-5 w-full">
          <div className="w-full flex flex-wrap xl:p-0">
            <div className="flex flex-col justify-between items-center w-full relative">
              {postsLoading && <p>Loading ongoing travels...</p>}
              {postsError && <p>Error fetching ongoing travels</p>}
              {ongoingPosts?.length === 0 && joinedPosts?.length === 0 && !postsLoading && !postsError && (
                <div className="text-center py-10">
                  <h1 className="text-n-8 dark:text-n-1 text-3xl font-bold py-2">
                    {t("DASHBOARD.Travels.notFoundOngoingTitle")}
                  </h1>
                  <p className="text-n-6 dark:text-n-2">
                  {t("DASHBOARD.Travels.notFoundOngoingText")}
                  </p>
                  <Link
                    to="/dashboard/create-post"
                    className="mt-5 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    {t("DASHBOARD.Travels.notFoundOngoingButton")}
                  </Link>
                </div>
              )}
              {ongoingPosts?.length > 0 && (
                <div className="flex flex-col w-full mb-10">
                  <div className="rounded-xl w-full">
                    <h1 className="text-n-8 dark:text-n-1 text-2xl lg:text-3xl py-2 lg:mb-4">
                    {t("DASHBOARD.Travels.ongoing")}
                    </h1>
                    <div className="mx-auto float-left w-full">
                      {ongoingPosts.map((post) => (
                        <HistoryPost
                          key={post._id}
                          post={post}
                          isOngoing={true}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {joinedPosts?.length > 0 && (
                <div className="flex flex-col w-full mb-10">
                  <div className="rounded-xl w-full">
                    <h1 className="text-n-8 dark:text-n-1 text-2xl lg:text-3xl py-2 lg:mb-4">
                    Joined Ongoing Travels
                    </h1>
                    <div className="mx-auto float-left w-full">
                      {joinedPosts.map((post) => (
                        <HistoryPost
                          key={post._id}
                          post={post}
                          isOngoing={true}
                          joined={true}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <hr className="w-full dark:border-gray-600" />
              {pendingRequestsLoading && <p>Loading pending requests...</p>}
              {pendingRequestsError && <p>Error fetching pending requests</p>}
              {pendingRequests?.length === 0 &&
                !pendingRequestsLoading &&
                !pendingRequestsError && (
                  <div className="text-center py-10">
                    <h1 className="text-n-8 dark:text-n-1 text-2xl lg:text-3xl font-bold py-2">
                      {t("DASHBOARD.Travels.notFoundPendingTitle")}
                    </h1>
                    <p className="text-n-6 dark:text-n-2 text-sm lg:text-md w-[90%] mx-auto">
                    {t("DASHBOARD.Travels.notFoundPendingText")}
                    </p>
                  </div>
                )}
              {pendingRequests?.length > 0 && (
                <div className="flex flex-col w-full">
                  <div className="pt-5 bg-n-1 dark:bg-neutral-950 w-full">
                    <h1 className="text-n-8 dark:text-n-1 text-2xl lg:text-3xl py-2 lg:mb-4">
                    {t("DASHBOARD.Travels.pending")}
                    </h1>
                    <div className="mx-auto float-left w-full">
                      {pendingRequests.map((request) =>
                        request.pendingRequests.map((pendingRequest) => (
                          <div
                            key={pendingRequest._id}
                            className="flex flex-col lg:flex-row justify-between items-center my-5 p-4 bg-white dark:bg-neutral-900 shadow rounded-lg"
                          >
                            <div>
                              <button
                                onClick={() =>
                                  handleGoToProfile(pendingRequest)
                                }
                              >
                                <div className="flex items-center dark:hover:bg-n-1/5 hover:bg-n-8/5 px-3 py-2 rounded-md">
                                  <img
                                    src={pendingRequest.profilePic}
                                    width={35}
                                    height={35}
                                    loading="lazy"
                                    alt={`${pendingRequest.name}'s profile`}
                                  />
                                  <div className="flex flex-col items-start ml-3 text-n-8 dark:text-gray-200">
                                    <h3 className="text-md truncate">
                                      {pendingRequest.name}
                                    </h3>
                                    <h3 className="text-xs text-gray-500 truncate">
                                      {pendingRequest.email}
                                    </h3>
                                  </div>
                                </div>
                              </button>
                              <div className="ml-2">
                                <p className="text-n-8 dark:text-n-1 my-1">
                                  <strong> {t("DASHBOARD.Travels.from")}:</strong> {request.from}
                                </p>
                                <p className="text-n-8 dark:text-n-1 my-1">
                                  <strong> {t("DASHBOARD.Travels.to")}:</strong> {request.to}
                                </p>
                                <p className="text-n-8 dark:text-n-1 my-1">
                                  <strong> {t("DASHBOARD.Travels.date")}:</strong>{" "}
                                  {new Date(request.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="self-start lg:self-end px-3  py-5">
                              <button
                                onClick={() =>
                                  handleAction(
                                    request._id,
                                    pendingRequest._id,
                                    "accept",
                                    request.from,
                                    pendingRequest.name,
                                    pendingRequest.surname,
                                    pendingRequest.email
                                  )
                                }
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
                              >
                                 {t("DASHBOARD.Travels.accept")}
                              </button>
                              <button
                                onClick={() =>
                                  handleAction(
                                    request._id,
                                    pendingRequest._id,
                                    "reject",
                                    request.from,
                                    pendingRequest.name,
                                    pendingRequest.surname,
                                    pendingRequest.email
                                  )
                                }
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                              >
                                 {t("DASHBOARD.Travels.reject")}
                              </button>
                            </div>
                          </div>
                        ))
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

export default Reservations;
