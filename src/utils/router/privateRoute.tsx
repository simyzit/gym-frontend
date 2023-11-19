import { Navigate, Outlet } from "react-router-dom";
import { useCustomSelector } from "../../redux/selectors";
import { ComponentType, FC } from "react";
import { IRouteProps } from "../../interfaces/user.interface";

export const PrivateRoute = () => {
  const { getIsLoggedIn: isLoggedIn, getIsRefreshing: isRefreshing } =
    useCustomSelector();

  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
