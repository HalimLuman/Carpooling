import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users';
const POSTS_URL = '/api/posts';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            })
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: `${USERS_URL}/forgot-password`,
                method: 'POST',
                body: email,
            }),
        }),
        resetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: `${USERS_URL}/resetpassword/${token}`,
                method: 'PUT',
                body: { password },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),
        reservePost: builder.mutation({
            query: ({ postId, userId }) => ({
                url: `${POSTS_URL}/reserve`,
                method: 'POST',
                body: { postId, userId },
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/delete/${id}`,
                method: 'DELETE',
            })
        }),
        verifyUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/verify-user`,
                method: 'POST',
                body: data,
            })
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: `${POSTS_URL}/create-post`,
                method: 'POST',
                body:data,
            })
        }),
        fetchPost: builder.query({
            query: () => `${POSTS_URL}/posts`,
            providesTags: ['Post'],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `${POSTS_URL}/delete-post/${id}`, // Update to match backend endpoint URL
                method: 'DELETE',
            })
        }),
        leavePost: builder.mutation({
            query: ({ postId, userId }) => ({
                url: `${POSTS_URL}/leave-post`,
                method: 'POST',
                body: { postId, userId },
            }),
        }),
        handleReservationRequest: builder.mutation({
            query: ({ postId, userId, action }) => ({
                url: `${POSTS_URL}/handle-request`,
                method: 'POST',
                body: { postId, userId, action },
            }),
        }),
        fetchPendingRequests: builder.query({
            query: () => `${POSTS_URL}/pending-requests`,
        }),
        createComment: builder.mutation({
            query: ({commentedPic, commentedFrom, commentedFromName, commentedTo, context, rating }) => ({
                url: `${USERS_URL}/create-comment`, // Adjust the endpoint as per your backend
                method: 'POST',
                body: {commentedPic, commentedFrom, commentedFromName, commentedTo, context, rating },
            }),
        }),
        fetchComments: builder.query({
            query: () => `${USERS_URL}/comments`, // Adjust endpoint as per your backend
            providesTags: ['Comment'], // Optional: tags for caching or invalidation
        }),
    })
})


export const { useLoginMutation, useRegisterMutation, useLeavePostMutation, useForgotPasswordMutation, useResetPasswordMutation, useLogoutMutation, useUpdateUserMutation, useDeleteUserMutation, useVerifyUserMutation, useCreatePostMutation, useFetchPostsQuery, useDeletePostMutation, useReservePostMutation, useFetchPendingRequestsQuery, useHandleReservationRequestMutation, useCreateCommentMutation, useFetchCommentsQuery} = usersApiSlice;