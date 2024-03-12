import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSilce";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
