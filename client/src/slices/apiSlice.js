import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: '',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: () => '/api/users/posts',
      providesTags: ['Post'],
    }),
  }),
});

export const { useFetchPostsQuery } = apiSlice;
