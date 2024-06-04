import React from 'react';
import { useFetchPendingRequestsQuery, useHandleReservationRequestMutation } from '../slices/usersApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { registration } from '../assets';
import AccountHeader from '../components/AccountHeader';
import { FaQuestionCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ExplanatoryBox = ({ title, content, icon }) => (
  <div className='p-5 border rounded-lg shadow-lg flex items-center text-n-8'>
    <div className='mr-4 p-4 rounded-full bg-white text-2xl text-gray-800'>
      {icon}
    </div>
    <div>
      <h2 className='text-lg font-bold mb-2'>{title}</h2>
      <p>{content}</p>
    </div>
  </div>
);

const ExplanatoryBoxes = () => (
  <div className='grid grid-cols-1 gap-6'>
    <ExplanatoryBox
      title="Understanding Reservation Requests"
      content="Review each reservation request carefully to ensure it meets your criteria and availability."
      icon={<FaQuestionCircle />}
    />
    <ExplanatoryBox
      title="Accepting Requests"
      content="Accepting a reservation means you agree to the terms and conditions. Ensure all details are correct before proceeding."
      icon={<FaCheckCircle />}
    />
    <ExplanatoryBox
      title="Rejecting Requests"
      content="If a request doesn't meet your criteria, you can reject it. Be prompt in your response to allow requesters to make alternative plans."
      icon={<FaTimesCircle />}
    />
  </div>
);

const AccountRequests = () => {
  const { data: pendingRequests, isLoading, isError, refetch } = useFetchPendingRequestsQuery();
  const [handleRequest] = useHandleReservationRequestMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleAction = async (postId, userId, action) => {
    try {
      await handleRequest({ postId, userId, action }).unwrap();
      toast.success(`Reservation ${action}ed successfully.`);
      refetch(); // Refresh the pending requests list
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${action} the reservation.`);
    }
  };

  const headerElements = [
    { label: 'Home', link: '/' },
    { label: 'Account', link: '/account' },
    { label: 'Pending Requests' }
  ];

  return (
    <div className="w-full min-h-screen text-n-8">
      <div className="flex flex-col items-center">
        <div className='container mx-auto px-4 text-n-8 mt-15'>
          <AccountHeader elements={headerElements} />
          <div className="flex my-10">
            <div className="w-[75%] flex flex-wrap">
              <div className="flex justify-between items-center w-full relative">
                {isLoading && <p className="text-lg">Loading...</p>}
                {isError && <p className="text-lg text-red-500">Error fetching pending requests</p>}
                {pendingRequests?.length === 0 && !isLoading && !isError && (
                  <h1 className="text-n-8 text-2xl font-bold py-2 container self-start">No Pending Requests</h1>
                )}
                {pendingRequests?.length > 0 && (
                  <div className="container grid grid-cols-1 gap-10">
                  {pendingRequests.map((request) => (
                    <div key={request._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative">
                        <img 
                          src={registration} // Assuming you have an image URL
                          alt="Reservation"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black shadow text-white px-2 py-1 rounded-lg text-sm">
                          {new Date(request.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">{request.from} - {request.to}</h3>
                        <div className="space-y-2">
                          {request.pendingRequests.map(user => (
                            <div key={user._id}>
                              <p className="text-gray-600"><strong>Requester Name:</strong> {user.name} {user.surname}</p>
                              <p className="text-gray-600"><strong>Requester Email:</strong> {user.email}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 border-t flex justify-end">
                        <button 
                          onClick={() => handleAction(request._id, request.pendingRequests[0]._id, 'accept')}
                          className="bg-black text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out mr-2 hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleAction(request._id, request.pendingRequests[0]._id, 'reject')}
                          className="border border-black text-black px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-red-600/50"
                        >
                          Reject
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
                
                )}
              </div>
            </div>
            <div className="w-[30%]">
              <ExplanatoryBoxes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountRequests;
