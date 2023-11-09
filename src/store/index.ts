import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./feature/posts/postSlice";
import { userReducer } from "./feature/user/userSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
