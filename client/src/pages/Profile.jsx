import React, { useState } from "react";
import NavbarMain from "../components/NavbarMain";
import { useSelector } from "react-redux";
import {
  useCreateCommentMutation,
  useFetchCommentsQuery,
  useFetchPostsQuery,
} from "../slices/usersApiSlice";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";

const Profile = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const postOwner = location.state?.postOwner;
  const { data: posts, isLoading, isError } = useFetchPostsQuery();
  const {
    data: comments,
  } = useFetchCommentsQuery(postOwner?._id);
  const { userInfo } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [createCommentMutation] = useCreateCommentMutation();

  const userComments =
    comments?.filter((comment) => comment.commentedTo === postOwner?._id) || [];
  let totalRating = 0;
  userComments.forEach((comment) => {
    totalRating += comment.rating;
  });
  let averageRating =
    userComments.length > 0
      ? (totalRating / userComments.length).toFixed(1)
      : "Not rated yet";
  const userPosts =
    posts?.filter((post) => post.publisher._id === postOwner?._id) || [];

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCommentMutation({
        commentedPic: userInfo?.profilePic,
        commentedFrom: userInfo?._id,
        commentedFromName: userInfo?.name,
        commentedTo: postOwner._id,
        context: comment,
        rating: rating,
      }); // Refetch comments after adding a new one

      setComment("");
      setRating(0);

      toast.success("Comment added");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-100 dark:bg-neutral-950 min-h-screen">
      <NavbarMain />

      <main className="max-w-7xl mx-auto py-6 pt-15 sm:px-6 lg:px-8">
        <div className="px-4 pt-10 sm:px-0">
          <section className="bg-white dark:bg-neutral-900 overflow-hidden shadow dark:shadow-white/20 rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
              <h3 className="text-xl leading-6 font-medium text-gray-900 dark:text-gray-200 flex flex-col">
                {`${t("PROFILE.profileInfo")}`}
              </h3>
              {postOwner && (
                <img
                  src={postOwner.profilePic}
                  width={50}
                  height={50}
                  alt="Profile"
                />
              )}
            </div>
            <div className="border-t border-gray-200 dark:border-neutral-700">
              <dl className="divide-y divide-gray-200 dark:divide-neutral-700">
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {`${t("PROFILE.name")}`}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner?.name} {postOwner?.surname}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {`${t("PROFILE.email")}`}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner?.email}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {`${t("PROFILE.city")}`}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner?.city}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {`${t("PROFILE.gender")}`}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner?.gender}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {`${t("PROFILE.age")}`}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {calculateAge(postOwner?.dateOfBirth)}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {`${t("PROFILE.averageRating")}`}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {averageRating} / 5.0
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {`${t("PROFILE.createdTravels")}`}{" "}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner?.createdPosts}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {`${t("PROFILE.joinedTravels")}`}{" "}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner?.joinedPosts?.length || 0}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {`${t("PROFILE.canceledTravels")}`}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner?.deletedPosts}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="bg-white dark:bg-neutral-900 overflow-hidden shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
                {`${t("PROFILE.comments")}`}
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-neutral-700">
              <div className="px-6 flex flex-col">
                {userComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start py-3 my-2 px-3 w-full"
                  >
                    {console.log(comment.commentedPic)}
                    <img
                      src={comment.commentedPic}
                      width={45}
                      alt="Profile"
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex w-full justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                          {comment.commentedFromName}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center mt-1">
                        {Array(comment.rating)
                          .fill()
                          .map((_, index) => (
                            <svg
                              key={index}
                              className="w-4 h-4 text-yellow-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.359 4.174a1 1 0 00.95.69h4.381c.969 0 1.371 1.24.588 1.81l-3.552 2.577a1 1 0 00-.364 1.118l1.359 4.174c.3.921-.755 1.688-1.538 1.118l-3.552-2.577a1 1 0 00-1.176 0l-3.552 2.577c-.783.57-1.838-.197-1.538-1.118l1.359-4.174a1 1 0 00-.364-1.118L2.75 9.601c-.783-.57-.381-1.81.588-1.81h4.381a1 1 0 00.95-.69l1.359-4.174z" />
                            </svg>
                          ))}
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 break-words flex-wrap w-[25%] lg:w-[80%]">
                        {comment.context}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {userInfo && userInfo._id !== postOwner?._id && (
            <section className="bg-white dark:bg-neutral-900 overflow-hidden shadow dark:shadow-white/20 rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
                  {`${t("PROFILE.comments")}`}
                </h3>
              </div>
              <div className="border-t border-gray-200 dark:border-neutral-700">
                <form onSubmit={handleSubmit} className="px-6 py-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value, index) => (
                      <svg
                        key={index}
                        className={`h-5 w-5 fill-current ${
                          value <= rating
                            ? "text-yellow-400 dark:text-yellow-300"
                            : "text-gray-400 dark:text-gray-600"
                        } cursor-pointer`}
                        onClick={() => setRating(value)}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 1l2.583 6.639H18.89l-5.527 4.278 2.084 7.083L10 14.899 5.553 19l2.084-7.083L1.11 7.639H8.417L10 1z" />
                      </svg>
                    ))}
                  </div>
                  <div className="my-4">
                    <textarea
                      id="comment"
                      placeholder={`${t("PROFILE.writeComment")}`}
                      name="comment"
                      rows="3"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-n-8 dark:text-n-1 bg-n-1 border dark:bg-neutral-900 resize-none border-gray-300 dark:border-neutral-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {`${t("PROFILE.addComment")}`}
                  </button>
                </form>
              </div>
            </section>
          )}
          <section className="bg-white dark:bg-neutral-900 overflow-hidden shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
                {`${t("PROFILE.recent")}`}
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4">
                {isLoading ? (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Loading posts...
                  </p>
                ) : isError ? (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Error loading posts
                  </p>
                ) : userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-col md:flex-row items-center justify-between my-4 p-4 shadow-sm dark:shadow-white/20 rounded-lg bg-white dark:bg-neutral-900"
                    >
                      <div className="flex items-center space-x-3 mb-2 md:mb-0 md:mr-4">
                        <FaMapMarkerAlt className="text-indigo-500 dark:text-indigo-400" />
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                          {post.from}
                        </p>
                        <span className="text-gray-600 dark:text-gray-300">
                          -
                        </span>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                          {post.to}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-indigo-500 dark:text-indigo-400 mr-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(post.date)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>No Recent Posts</h1>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
