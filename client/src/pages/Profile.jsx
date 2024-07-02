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

const Profile = () => {
  const location = useLocation();
  const postOwner = location.state?.postOwner;
  const { data: posts, isLoading, isError, refetch } = useFetchPostsQuery();
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
    refetch: refetchComments,
  } = useFetchCommentsQuery(postOwner?._id);
  const { userInfo } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [createCommentMutation] = useCreateCommentMutation();

  const userComments =
    comments?.filter((comment) => comment.commentedTo === postOwner._id) || [];
  let totalRating = 0;
  userComments.forEach(comment => {
    totalRating += comment.rating;
  });
  let averageRating = (totalRating / userComments.length).toFixed(1) || 'Not any rating';
  const userPosts =
    posts?.filter((post) => post.publisher._id === postOwner._id) || [];

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
        commentedTo: postOwner._id,
        context: comment,
        rating: rating,
      });

      refetch(); // Refetch posts or user data as needed

      setComment("");
      setRating(0);

      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <NavbarMain />

      <main className="max-w-7xl mx-auto py-6 pt-15 sm:px-6 lg:px-8">
        <div className="px-4 pt-10 sm:px-0">
          <section className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
              <h3 className="text-xl leading-6 font-medium text-gray-900 dark:text-gray-200 flex flex-col">
                <span>Profile</span>
                <span>Information</span>
              </h3>
              <img src={postOwner.profilePic} width={60}/>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner.name} {postOwner.surname}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner.email}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    City
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner.city}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Gender
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner.gender}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Age
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {calculateAge(postOwner.dateOfBirth)}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Average Rating
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {averageRating} / 5.0
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Created Travels:{" "}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner.createdPosts}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Joined Travels:{" "}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner.joinedPosts.length}
                  </dd>
                </div>
                <div className="py-4 px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Travels Canceled
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {postOwner.deletedPosts}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
                Comments and Ratings
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="px-6">
                {userComments.map((comment) => (
                  <div key={comment.id} className="flex items-center my-6">
                    <img src={postOwner.profilePic} width={45}/>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {comment.commentedFrom}
                      </p>
                      <div className="flex items-center mt-1">
                        {/* Star Rating */}
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((index) => (
                            <svg
                              key={index}
                              className={`h-4 w-4 fill-current ${
                                index <= comment.rating
                                  ? "text-yellow-400 dark:text-yellow-300"
                                  : "text-gray-400 dark:text-gray-600"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10 1l2.583 6.639H18.89l-5.527 4.278 2.084 7.083L10 14.899 5.553 19l2.084-7.083L1.11 7.639H8.417L10 1z"
                              />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        {comment.context}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleSubmit}
                className="px-6 py-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <textarea
                    className="resize-none w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-n-1 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
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
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                  >
                    Add Comment
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
                Recent Posts and Travel Statistics
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
                    <div key={post.id} className="flex items-center mb-4">
                      <div className="ml-3 flex items-center">
                        <p className="text-md font-medium text-gray-900 dark:text-gray-200">
                          {post.from}
                        </p>
                        &nbsp;
                        <span>-</span>&nbsp;
                        <p className="text-md text-gray-600 dark:text-gray-300">
                          {post.to}
                        </p>
                      </div>
                      <div className="ml-3 flex items-center">
                        <p className="text-md font-medium text-gray-900 dark:text-gray-200">{`${new Date(
                          post.date
                        ).getDay()}/${new Date(
                          post.date
                        ).getMonth()}/${new Date(post.date).getFullYear()}`}</p>
                        &nbsp;
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
