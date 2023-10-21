import { useAppSelector } from "../hooks/redux.hooks";

export const useCustomSelector = () => {
  return {
    getIsLoggedIn: useAppSelector((state) => state.auth.isLoggedIn),
    getIsRefreshing: useAppSelector((state) => state.auth.isRefreshing),
    getIsRegister: useAppSelector((state) => state.auth.isRegister),
    getToken: useAppSelector((state) => state.auth.accessToken),
  };
};

// export const selectIsAuth = (state) => Boolean(state.auth.data);
// export const selectAuthStatus = (state) => state.auth.status;
// export const selectAuthData = (state) => state.auth.status;
