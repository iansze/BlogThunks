import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "../../../types/types";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const updatePost = createAsyncThunk("posts/updatePost", async (post: Post) => {
  const response = await axios.put(`${POSTS_URL}/${post.id}`, post);
  return response.data;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id: string) => {
  await axios.delete(`${POSTS_URL}/${id}`);
  return { id };
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (post: Post) => {
  const response = await axios.post(POSTS_URL, post);
  return response.data;
});
