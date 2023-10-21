import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import userReducer from "./slices/userSlice";
import { registerReducer } from "./slices/register";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken"],
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    register: registerReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// import { configureStore } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import { todoReducer } from './todo/todoSlice';
// import { authReducer } from './auth/authSlice';

// const authPersistConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['accessToken'],
// };

// export const store = configureStore({
//   reducer: {
//     todos: todoReducer,
//     auth: persistReducer(authPersistConfig, authReducer),
//   },
//   middleware(getDefaultMiddleware) {
//     return getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     });
//   },
// });

// export const persistor = persistStore(store);
