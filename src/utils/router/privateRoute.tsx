import { Navigate, Outlet } from "react-router-dom";
import { useCustomSelector } from "../../redux/selectors";

export const PrivateRoute = () => {
  const { getIsLoggedIn: isLoggedIn, getIsRefreshing: isReffershing } =
    useCustomSelector();

  const shouldRedirect = !isLoggedIn && !isReffershing;
  return shouldRedirect ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
