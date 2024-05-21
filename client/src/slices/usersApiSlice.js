import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users';

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
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/delete/${id}`,
                method: 'DELETE',
            })
        }),
        veriyfUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/verify-user`,
                method: 'POST',
                body: data,
            })
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/create-post`,
                method: 'POST',
                body:data,
            })
        }),
        fetchPost: builder.mutation({
            query: () => 'posts',
            providesTags: ['Post'],
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/delete-post/${id}`, // Update to match backend endpoint URL
                method: 'DELETE',
            })
        }),
    })
})


export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useUpdateUserMutation, useDeleteUserMutation, useVeriyfUserMutation, useCreatePostMutation, useFetchPostsQuery, useDeletePostMutation} = usersApiSlice;