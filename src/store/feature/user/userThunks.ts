import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("posts/fetchUsers", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});
