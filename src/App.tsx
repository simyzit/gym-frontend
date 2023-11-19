import React, { useEffect, useState, useMemo } from "react";
import "./index.css";
import Home from "./routes/Home";
import Membership from "./routes/Membership";
import About from "./routes/About";
import Trainers from "./routes/Trainers";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import { fetchCurrentUser, googleApi } from "./redux/auth/authOperation";
import { AppDispatch } from "./redux/store";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "./redux/selectors";
import SuccessVerified from "./routes/SuccessVerified";
import UsersDashboard from "./components/usersDashboard/usersDashboard";
import MembershipDashboard from "./components/membershipDashboard/MembershipDashboard";
import ProfileDashboard from "./components/profileDashboard/ProfileDashvoard";
import OrdersDashboard from "./components/ordersDashboard/OrdersDashvoard";
import PrivateRoute from "./utils/router/privateRoute";
import MyMebershipDashboard from "./components/myMebershipDashboard/MyMebershipDashboard";
import VisitsDashboard from "./components/visitsDashboard/VisitsDashboard";
import SuccessVisit from "./routes/SuccessVisit";
import UnsuccessVisit from "./routes/UnsuccessVisit";
import VerifeidAgain from "./routes/VerifiedAgain";

export const useAppDispatch: () => AppDispatch = useDispatch;

function App() {
  const {
    getToken: token,
    getIsRefreshing: isRefreshing,
    getIsLoggedIn,
  } = useCustomSelector();
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
  const days = searchParams.get("days");
  const qrCode = searchParams.get("qrCode");

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }

    setIsLogin(getIsLoggedIn);
  }, [dispatch, token]);

  useEffect(() => {
    if (accessToken) {
      dispatch(
        googleApi({
          accessToken,
          email,
          avatar,
          refreshToken,
          role,
          surname,
          qrCode,
          days,
        })
      );
      if (isLogin) {
        navigate("/profile");
      }
    }
  }, [
    dispatch,
    accessToken,
    email,
    avatar,
    refreshToken,
    role,
    surname,
    qrCode,
    days,
  ]);

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
          <Route path="/visits" element={<VisitsDashboard />} />
          <Route path="/my-membership" element={<MyMebershipDashboard />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/about" element={<About />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/success-verified" element={<SuccessVerified />} />
        <Route path="/success-visit" element={<SuccessVisit />} />
        <Route path="/unsuccess-visit" element={<UnsuccessVisit />} />
        <Route path="/verified-again" element={<VerifeidAgain />} />
      </Routes>
    </>
  );
}

export default App;
