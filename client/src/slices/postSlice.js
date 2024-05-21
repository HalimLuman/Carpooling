// Modify your postSlice to have a new action to fetch posts
import { createSlice } from '@reduxjs/toolkit';
import { useFetchPostsQuery } from './apiSlice'; // Assuming you have a function to fetch posts from your API

const initialState = {
    postInfo: localStorage.getItem('postInfo') ? JSON.parse(localStorage.getItem('postInfo')) : null,
    posts: [],
    loading: false,
    error: null
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPostInfo: (state, action) => {
            state.postInfo = action.payload;
            localStorage.setItem('postInfo', JSON.stringify(action.payload))
        },
        fetchPostsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const { setPostInfo, fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } = postSlice.actions;

export const fetchAllPosts = () => async (dispatch) => {
    dispatch(fetchPostsStart());
    try {
        const response = await useFetchPostsQuery(); // Implement this function to fetch posts from your API
        dispatch(fetchPostsSuccess(response.data)); // Assuming your API returns data in a 'data' field
    } catch (error) {
        dispatch(fetchPostsFailure(error.message));
    }
};

export default postSlice.reducer;
