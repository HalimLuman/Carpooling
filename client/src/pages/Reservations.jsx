import React, { useEffect, useState } from "react";
import {
  useFetchPendingRequestsQuery,
  useFetchPostsQuery,
  useHandleReservationRequestMutation,
} from "../slices/usersApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import HistoryPost from "../components/HistoryPost";

const Reservations = () => {
  const { data: posts, isLoading: postsLoading, isError: postsError, refetch: refetchPosts } = useFetchPostsQuery();
  const { data: pendingRequests, isLoading: pendingRequestsLoading, isError: pendingRequestsError, refetch: refetchPendingRequests } = useFetchPendingRequestsQuery();
  const [handleRequest] = useHandleReservationRequestMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [ongoingPosts, setOngoingPosts] = useState([]);

  useEffect(() => {
    if (!posts) return;
    
    const currentDate = new Date().getTime();
    const userPosts = posts.filter(post => userInfo.posts.includes(post._id));
    const ongoing = userPosts.filter(post => new Date(post.date).getTime() >= currentDate);
    setOngoingPosts(ongoing);
  }, [posts, userInfo.posts]);

  const handleAction = async (postId, userId, action, from, name, surname, email) => {
    try {
      await handleRequest({ postId, userId, action }).unwrap();
      toast.success(`Reservation has been ${action === "accept" ? "accepted" : "rejected"} successfully.`);
      refetchPendingRequests();
      refetchPosts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to process reservation request.");
    }
  };

  return (
    <div className="w-full bg-n-1 dark:bg-gray-800 h-full rounded-lg">
      <div className="flex flex-col items-center w-[98%] mx-auto">
        <div className="flex mt-5 w-full">
          <div className="w-full flex flex-wrap p-3 xl:p-0">
            <div className="flex flex-col justify-between items-center w-full lg:mr-5 relative">
              
              {postsLoading && <p>Loading ongoing posts...</p>}
              {postsError && <p>Error fetching ongoing posts</p>}
              {ongoingPosts?.length === 0 && !postsLoading && !postsError && (
                <h1 className="text-n-8 dark:text-n-1 text-2xl font-bold py-2 text-left w-full">
                  No Ongoing Posts
                </h1>
              )}
              {ongoingPosts?.length > 0 && (
                <div className="flex flex-col w-full">
                  <div className="rounded-xl bg-n-1 dark:bg-gray-800 w-full">
                    <h1 className="text-n-8 dark:text-n-1 text-3xl font-bold py-2 mb-4">
                      Ongoing Posts
                    </h1>
                    <div className="mx-auto float-left w-full">
                      {ongoingPosts.map((post) => (
                        <HistoryPost key={post._id} post={post} isOngoing={true} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {pendingRequestsLoading && <p>Loading pending requests...</p>}
              {pendingRequestsError && <p>Error fetching pending requests</p>}
              {pendingRequests?.length === 0 && !pendingRequestsLoading && !pendingRequestsError && (
                <h1 className="text-n-8 dark:text-n-1 text-2xl font-bold py-2 text-left w-full mt-10">
                  No Pending Requests
                </h1>
              )}
              {pendingRequests?.length > 0 && (
                <div className="flex flex-col w-full">
                  <div className="rounded-xl bg-n-1 dark:bg-gray-800 w-full">
                    <h1 className="text-n-8 dark:text-n-1 text-3xl font-bold py-2 mb-4">
                      Pending Reservation Requests
                    </h1>
                    <div className="mx-auto float-left w-full">
                      {pendingRequests.map((request) => (
                        <div
                          key={request._id}
                          className="flex justify-between items-center my-5 p-4 bg-white dark:bg-gray-700 shadow rounded-lg"
                        >
                          <div>
                            <p className="text-n-8 dark:text-n-1 my-1">
                              <strong>From:</strong> {request.from}
                            </p>
                            <p className="text-n-8 dark:text-n-1 my-1">
                              <strong>To:</strong> {request.to}
                            </p>
                            <p className="text-n-8 dark:text-n-1 my-1">
                              <strong>Date:</strong>{" "}
                              {new Date(request.date).toLocaleDateString()}
                            </p>
                            {request.pendingRequests.map((pendingRequest) => (
                              <div key={pendingRequest._id}>
                                <p className="text-n-8 dark:text-n-1 my-1">
                                  <strong>Requested:</strong>{" "}
                                  {pendingRequest.name}
                                </p>
                                <p className="text-n-8 dark:text-n-1 my-1">
                                  <strong>Requester Email:</strong>{" "}
                                  {pendingRequest.email}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div>
                            <button
                              onClick={() =>
                                handleAction(
                                  request._id,
                                  request.pendingRequests[0]._id,
                                  "accept",
                                  request.from,
                                  request.user.name,
                                  request.user.surname,
                                  request.user.email
                                )
                              }
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleAction(
                                  request._id,
                                  request.pendingRequests[0]._id,
                                  "reject",
                                  request.from,
                                  request.user.name,
                                  request.user.surname,
                                  request.user.email
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                              Reject
                            </button>
                            <Link
                              to={`/profile/${request.user._id}`}
                              className="ml-2 text-blue-500 hover:underline"
                            >
                              View Profile
                            </Link>
                          </div>
                        </div>
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

export default Reservations;
