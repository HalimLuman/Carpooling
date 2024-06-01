import React from 'react';
import { useFetchPendingRequestsQuery, useHandleReservationRequestMutation } from '../slices/usersApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Reservations = () => {
    const { data: pendingRequests, isLoading, isError, refetch } = useFetchPendingRequestsQuery();
    const [handleRequest] = useHandleReservationRequestMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const handleAction = async (postId, userId, action) => {
        try {
            
            await handleRequest({ postId, userId, action }).unwrap();
            toast.success("Reservation has accepted succesfully.")
            refetch(); // Refresh the pending requests list
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full bg-[#f8f8f8] min-h-[100vh]">
            <div className="flex flex-col items-center">
                <div className="flex mt-5 w-[90%]">
                    <div className="w-full flex flex-wrap">
                        <div className="flex justify-between items-center w-full mr-5 relative">
                            {isLoading && <p>Loading...</p>}
                            {isError && <p>Error fetching pending requests</p>}
                            {pendingRequests?.length === 0 && !isLoading && !isError && (
                                <h1 className="text-n-8 text-2xl font-bold py-2">No Pending Requests</h1>
                            )}
                            {pendingRequests?.length > 0 && (
                                <div className="flex flex-col w-full">
                                    <div className="border border-n-8/10 rounded-xl px-10 py-5 bg-n-1 w-full">
                                        <h1 className="text-n-8 text-xl font-bold px-4 py-2 mb-4">Pending Reservation Requests</h1>
                                        <div className="mx-auto float-left w-[98%]">
                                            {pendingRequests.map((request) => (
                                                <div key={request._id} className="flex justify-between items-center mb-4 p-4 bg-white shadow rounded-lg">
                                                    <div>
                                                        <p><strong>From:</strong> {request.from}</p>
                                                        <p><strong>To:</strong> {request.to}</p>
                                                        <p><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <button 
                                                            onClick={() => handleAction(request._id, request.pendingRequests[0]._id, 'accept')}
                                                            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button 
                                                            onClick={() => handleAction(request._id, request.user, 'reject')}
                                                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                        >
                                                            Reject
                                                        </button>
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
