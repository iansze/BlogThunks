import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  FetchPostsResponse,
  Post,
  PostInitialState,
  ReactionAddedPayload,
} from "../../../types/types";
import { addNewPost, deletePost, fetchPosts, updatePost } from "./postsThunks";
import { sub } from "date-fns";

const initialState: PostInitialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  //For synchronous actions
  reducers: {
    // Same functionality with addNewPost in extraReducers
    // postAdded: {
    //   reducer(state, action: PayloadAction<Post>) {
    //     state.posts.push(action.payload);
    //   },
    //   //Optional. Same as passing the payload directly when dispatching the action
    //   prepare(title: string, body: string, userId: string) {
    //     const newPost: Post = {
    //       id: nanoid(),
    //       title,
    //       body,
    //       date: new Date().toISOString(),
    //       userId,
    //       reactions: {
    //         thumbsUp: 0,
    //         wow: 0,
    //         heart: 0,
    //         rocket: 0,
    //         coffee: 0,
    //       },
    //     };
    //     return { payload: newPost };
    //   },
    // },
    reactionAdded(state, action: PayloadAction<ReactionAddedPayload>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  //Actions defined outside the slice, For asynchronous actions
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      let min = 1;
      const loadedPosts = action.payload.map((post: FetchPostsResponse) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        return post;
      });
      state.posts = state.posts.concat(loadedPosts);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as string;
    });
    builder.addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      if (!action.payload?.id) {
        console.error("updatePost: invalid payload");
        return;
      }
      const { id } = action.payload;
      action.payload.date = new Date().toISOString();
      const posts = state.posts.filter((post) => post.id !== id);
      state.posts = [...posts, action.payload];
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      //Testing purpose, api only contain id 1-100
      //when adding new post, id will be 101, so it will be rejected
      //add new post will be rejected, but the post will be added to the state
      const updatedPost = action.meta.arg;
      const posts = state.posts.filter((post) => post.id !== updatedPost.id);
      state.posts = [...posts, updatedPost];
    });

    builder.addCase(deletePost.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
      if (!action.payload?.id) {
        console.error("deletePost: invalid payload");
        return;
      }
      const { id } = action.payload;
      const posts = state.posts.filter((post) => post.id !== id);
      state.posts = posts;
    });
    builder.addCase(addNewPost.fulfilled, (state, action: PayloadAction<Post>) => {
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };
      state.posts.push(action.payload);
    });
  },
});

export const { reactionAdded } = postSlice.actions;

export const postReducer = postSlice.reducer;
