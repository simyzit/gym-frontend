import React, { useEffect, useState, useMemo } from "react";
import "./index.css";
import Home from "./routes/Home";
import Membership from "./routes/Membership";
import About from "./routes/About";
import Trainers from "./routes/Trainers";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import {
  fetchCurrentUser,
  googleApi,
  logout,
} from "./redux/auth/authOperation";
import { AppDispatch } from "./redux/store";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "./redux/selectors";
import Loader from "./components/UI/loader/loader";
import Dashboard from "./routes/Dashboard";
import SuccessVerified from "./routes/SuccessVerified";
import UsersDashboard from "./components/usersDashboard/usersDashboard";
import MembershipDashboard from "./components/membershipDashboard/MembershipDashboard";
import ProfileDashboard from "./components/profileDashboard/ProfileDashvoard";
import OrdersDashboard from "./components/ordersDashboard/OrdersDashvoard";
import PrivateRoute from "./utils/router/privateRoute";

export const useAppDispatch: () => AppDispatch = useDispatch;

function App() {
  const {
    getToken: token,
    getIsRefreshing: isRefreshing,
    getIsLoggedIn,
  } = useCustomSelector();
  const [rtlCache, setRtlCache] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const accessToken = searchParams.get("accessToken");
  const email = searchParams.get("email");
  const refreshToken = searchParams.get("refreshToken");
  const avatar = searchParams.get("avatar");
  const role = searchParams.get("role");
  const surname = searchParams.get("surname");

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }

    setIsLogin(getIsLoggedIn);
  }, [dispatch, token]);

  useEffect(() => {
    if (accessToken) {
      dispatch(
        googleApi({ accessToken, email, avatar, refreshToken, role, surname })
      );
      navigate("/profile");
    }
  }, [dispatch, accessToken, email, avatar, refreshToken, role, surname]);

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UsersDashboard />} />
          <Route
            path="/membership-dashboard"
            element={<MembershipDashboard />}
          />
          <Route path="/profile" element={<ProfileDashboard />} />
          <Route path="/orders" element={<OrdersDashboard />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/about" element={<About />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/success" element={<SuccessVerified />} />
      </Routes>
    </>
  );
}

export default App;
