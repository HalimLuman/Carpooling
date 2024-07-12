import React from "react";
import NavbarMain from "../components/NavbarMain";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useReservePostMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PostInfo = () => {
  const location = useLocation();
  const post = location.state?.post;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [reservePost] = useReservePostMutation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (!post) {
    return (
      <>
        <NavbarMain />
        <div className="container mx-auto mt-12 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            No post data available
          </p>
        </div>
      </>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      if(!userInfo){
        navigate("/login");
      }
      const reservationRes = await reservePost({
        postId: post._id,
        userId: userInfo._id,
      }).unwrap();
      toast.success(
        "Reservation made and an email has been sent to the travel owner"
      );
      dispatch(setCredentials({ ...reservationRes }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handlePostOwner = () => {
      navigate(`/profiles/${post.publisher._id}`, {
        state: { postOwner: post.publisher },
      });
  };

  return (
    <>
      <NavbarMain />
      <div className="bg-gray-100 dark:bg-neutral-950 pt-[7rem] pb-[4rem] min-h-screen">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <div className="bg-white dark:bg-neutral-900 dark:shadow-white/20 rounded-lg shadow-md p-6 col-span-2">
              <h1 className="text-3xl text-center md:text-4xl mb-8 mt-4 text-gray-800 dark:text-gray-100">
                {post.from} - {post.to}
              </h1>
              <div className="px-3 lg:px-6 py-3 col-span-2">
                <h2 className="text-xl md:text-2xl mb-4 text-gray-800 dark:text-gray-100">
                  Trip Information
                </h2>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Date:
                  </p>
                  <p className="text-lg text-gray-900 dark:text-gray-200">
                    {formatDate(post.date)}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Departure Time:
                  </p>
                  <p className="text-lg text-gray-900 dark:text-gray-200">
                    {post.time}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    Available Seats:
                  </p>
                  <p className="text-lg text-gray-900 dark:text-gray-200">
                    {post.capacity - post.reservations.length}
                  </p>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl md:text-2xl mb-4 text-gray-800 dark:text-gray-100">
                    Additional Information
                  </h2>
                  <div className="flex justify-between items-center">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      Smoking Allowed:
                    </p>
                    <p className="text-lg text-gray-900 dark:text-gray-200">
                      {post.smoking ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      Pets Allowed:
                    </p>
                    <p className="text-lg text-gray-900 dark:text-gray-200">
                      {post.pets ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg col-span-2 lg:col-span-1">
              <div className="flex flex-col items-center bg-white dark:bg-neutral-800 border border-transparent rounded-lg shadow-lg p-8">
                <div className="w-full mb-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                    Total Price:
                  </p>
                  <p className="text-3xl text-gray-900 dark:text-gray-200">
                    {post.price} MKD
                  </p>
                </div>
                <button
                  onClick={handlePayment}
                  className={`w-full py-3 rounded-lg text-lg transition duration-300 ease-in-out ${
                    post.reservations.length >= post.capacity
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  disabled={post.reservations.length >= post.capacity}
                >
                  {post.reservations.length >= post.capacity
                    ? "Fully Booked"
                    : "Request a reservation"}
                </button>
                <div className="mt-6 w-full">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    For inquiries, please contact:
                  </p>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
                    {post.publisher.email}
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-neutral-800 border border-transparent rounded-lg shadow-lg p-8 mt-5 w-full">
                <h2 className="text-xl md:text-2xl mb-4 text-gray-800 dark:text-gray-100">
                  Car Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 text-gray-700 dark:text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <div>
                      <p className="text-lg text-gray-700 dark:text-gray-300">
                        Model
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.carModel}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 text-gray-700 dark:text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <div>
                      <p className="text-lg text-gray-700 dark:text-gray-300 ">
                        Color
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.carColor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mt-8 w-full">
            <h2 className="text-xl md:text-2xl mb-2 text-gray-800 dark:text-gray-100">
              {`Go to ${post.publisher.name}'s profile`}
            </h2>
            <div
              className="flex items-center p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              onClick={handlePostOwner}
            >
              <div className="flex justify-center items-center w-[50px] h-[50px] bg-blue-600 rounded-full">
                <img src={post.publisher.profilePic}/>
              </div>
              <div className="ml-5">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {post.publisher.name} {post.publisher.surname}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {post.publisher.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostInfo;
