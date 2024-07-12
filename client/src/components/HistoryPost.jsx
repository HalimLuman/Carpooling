import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDeletePostMutation, useLeavePostMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

// Function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const HistoryPost = ({ post, isOngoing, joined }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();
  const [leavePost] = useLeavePostMutation();
  const date = formatDate(post.date); // Format the date here
  const { userInfo } = useSelector((state) => state.auth);

  const handleDelete = async () => {
    try {
      // Perform deletion of post
      await deletePost(post._id);
      // Update userInfo in Redux state
      const updatedUserInfo = {
        ...userInfo,
        posts: userInfo.posts.filter((p) => p !== post._id), // Remove deleted post from userInfo.posts
        deletedPosts: userInfo.deletedPosts + 1, // Increment deletedPosts count
      };
      dispatch(setCredentials(updatedUserInfo));

      // Notify user of successful deletion
      toast.success("Post Deleted successfully", {
        autoClose: 1000,
        pauseOnHover: false,
      });

      // Reload the window after a delay to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred while deleting post");
    }
  };

  const handleLeavePost = async () => {
    try {
      // Perform leave post action
      await leavePost({ postId: post._id, userId: userInfo._id });

      // Update userInfo in Redux state or local state
      const updatedUserInfo = {
        ...userInfo,
        joinedPosts: userInfo.joinedPosts.filter((p) => p !== post._id),
      };
      dispatch(setCredentials(updatedUserInfo));

      // Notify user of successful leave
      toast.success("Successfully left the post", {
        autoClose: 1000,
        pauseOnHover: false,
      });

      // Optionally refresh data or navigate to another page
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred while leaving the post");
    }
  };

  const handleGoToProfile = (user) => {
    navigate(`/profiles/${user._id}`, { state: { postOwner: user } });
  };

  const confirmDelete = () => {
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const proceedDelete = () => {
    setShowConfirm(false);
    handleDelete();
  };

  const proceedLeaveTravel = () => {
    setShowConfirm(false);
    handleLeavePost();
  };

  return (
    <div className="flex flex-col mx-auto lg:w-full bg-white dark:bg-neutral-900 my-8 shadow-md dark:shadow-white/10 rounded-lg border border-gray-200 dark:border-neutral-800">
      <div className="w-full flex flex-col lg:flex-row p-6 pb-3 lg:pb-6 justify-between items-start lg:items-center">
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:w-[80%]">
          <div className="flex text-n-8 dark:text-n-1 text-left lg:w-[30%] mb-2 lg:mb-0 items-center gap-2 lg:gap-5">
            <FaMapMarkerAlt className="text-indigo-500 dark:text-indigo-400" />
            <h2 className="text-lg font-semibold">
              {post.from}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{post.to}
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row w-full lg:w-[70%] justify-between text-n-8 dark:text-n-1">
            <div className="flex items-center gap-3 lg:gap-5 mb-3 lg:mb-0">
              <FaCalendarAlt className="text-indigo-500 dark:text-indigo-400" />
              <h2 className="text-base text-gray-600 dark:text-gray-400">
                {date}
              </h2>
            </div>
            <h2 className="text-lg mb-3 lg:mb-0 lg:mx-2">
              <span className="font-bold">Price:</span>&nbsp;{post.price}
            </h2>
            <h2 className="text-lg mb-3 lg:mb-0 lg:mx-2">
              <span className="font-bold">Travelers:</span>&nbsp;{post.reservations.length}/{post.capacity}
            </h2>
          </div>
        </div>
        {isOngoing && (
          <div className="mt-5 lg:mt-0 flex justify-end items-center">
            <button
              className="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200"
              onClick={confirmDelete}
            >
              <MdDelete size={25} />
            </button>
          </div>
        )}
      </div>
      {isOngoing && post.reservations?.length > 0 && !joined && (
        <div className="w-full px-6 pb-5">
          <h3 className="text-md pl-3 font-semibold text-n-8 dark:text-n-1">Reserved List:</h3>
          <ul className="list-disc lg:px-5 py-2">
            {post.reservations.map((reservation) => (
              <button onClick={() => handleGoToProfile(reservation)} key={reservation._id}>
                <div className="flex items-center dark:hover:bg-n-1/5 hover:bg-n-8/5 px-3 py-2 rounded-md">
                  <img
                    src={reservation.profilePic}
                    width={35}
                    height={35}
                    loading="lazy"
                    alt={`${reservation.name}'s profile`}
                  />
                  <div className="flex flex-col items-start ml-3 text-n-8 dark:text-gray-200">
                    <h3 className="text-md truncate">{reservation.name}</h3>
                    <h3 className="text-xs text-gray-500 truncate">
                      {reservation.email}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </ul>
        </div>
      )}
      {!isOngoing && post.reservations?.length > 0 && (
        <div className="w-full px-6 pb-5">
          <h3 className="text-md pl-3 font-semibold text-n-8 dark:text-n-1">Reserved List:</h3>
          <ul className="list-disc lg:px-5 py-2">
            {post.reservations.map((reservation) => (
              <button onClick={() => handleGoToProfile(reservation)} key={reservation._id}>
                <div className="flex items-center dark:hover:bg-n-1/5 hover:bg-n-8/5 px-3 py-2 rounded-md">
                  <img
                    src={reservation.profilePic}
                    width={35}
                    height={35}
                    loading="lazy"
                    alt={`${reservation.name}'s profile`}
                  />
                  <div className="flex flex-col items-start ml-3 text-n-8 dark:text-gray-200">
                    <h3 className="text-md truncate">{reservation.name}</h3>
                    <h3 className="text-xs text-gray-500 truncate">
                      {reservation.email}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </ul>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-n-8 dark:text-n-1 dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-[90%] lg:w-[40%]">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to leave this post?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={joined ? proceedLeaveTravel : proceedDelete}
              >
                {joined ? "Leave Travel" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPost;
