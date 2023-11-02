import { useAppSelector } from "../hooks/redux.hooks";

export const useCustomSelector = () => {
  return {
    getIsLoggedIn: useAppSelector((state) => state.auth.isLoggedIn),
    getIsRefreshing: useAppSelector((state) => state.auth.isRefreshing),
    getIsRegister: useAppSelector((state) => state.auth.isRegister),
    getToken: useAppSelector((state) => state.auth.accessToken),
    getAllPackages: useAppSelector((state) => state.package.allItems),
    getAllUsers: useAppSelector((state) => state.user.allItems),
  };
};
