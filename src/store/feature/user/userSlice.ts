import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./userThunks";
import { User } from "../../../types/types";

const initialState: User[] = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdded(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export const { userAdded } = userSlice.actions;

export const userReducer = userSlice.reducer;
