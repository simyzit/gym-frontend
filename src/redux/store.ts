import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import userReducer from "./slices/userSlice";
import { registerReducer } from "./slices/register";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    register: registerReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
