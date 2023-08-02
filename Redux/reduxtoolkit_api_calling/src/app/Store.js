import { configureStore } from "@reduxjs/toolkit";
import userDetails from "../features/gitUserSlice";

export const store = configureStore({
  reducer: {
    app: userDetails,
  },
});