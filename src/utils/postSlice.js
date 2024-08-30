import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("https://quack-be.vercel.app/api/v1/posts");

  return response.data;
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId) => {
    const response = await axios.get(
      `https://quack-be.vercel.app/api/v1/post/${postId}`
    );
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, updateData }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/post/${postId}`,
      updateData
    );

    return response.data;
  }
);

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async ({ postId, dataToUpdate }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/comment/${postId}`,
      dataToUpdate
    );

    return response.data;
  }
);

export const likePost = createAsyncThunk(
  "posts/commentPost",
  async ({ postId, dataToUpdate }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/like/${postId}`,
      dataToUpdate
    );

    return response.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ dataToUpload }) => {
    const response = await axios.post(
      `https://quack-be.vercel.app/api/v1/post`,
      dataToUpload
    );
    return response.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPost: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "fullfilled";
      state.posts = action.payload.posts;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = "rejected";
    });

    builder.addCase(updatePost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.status = "fullfilled";
      const updatedPost = action.payload.post;
      state.posts = state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
    });
    builder.addCase(updatePost.rejected, (state) => {
      state.status = "rejected";
    });

    builder.addCase(fetchPostById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.currentPost = action.payload.post;
    });
    builder.addCase(fetchPostById.rejected, (state) => {
      state.status = "rejected";
    });

    builder.addCase(createPost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const newPost = action.payload;
      state.posts = [...state.posts, newPost];
    });
    builder.addCase(createPost.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const { resetCurrentPost } = postSlice.actions;

export default postSlice.reducer;
