import React, { useEffect, useState, useMemo } from 'react';
import "./index.css";
import Home from './routes/Home'
import Membership  from './routes/Membership'
import About from './routes/About'
import Trainers  from './routes/Trainers'
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchCurrentUser, googleApi, logout } from './redux/auth/authOperation';
import { AppDispatch } from './redux/store';
import { useDispatch } from 'react-redux';
import { useCustomSelector } from './redux/selectors';
import Loader from './components/UI/loader/loader';
import Dashboard from './routes/Dashboard';
import SuccessVerified from './routes/SuccessVerified';



export const useAppDispatch: () => AppDispatch = useDispatch;

function App() {
  const { getToken: token, getIsRefreshing: isRefreshing } = useCustomSelector(); 
  const [rtlCache, setRtlCache] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const accessToken = searchParams.get('accessToken');
  const email = searchParams.get('email');
  const refreshToken = searchParams.get('refreshToken');
  const avatar = searchParams.get('avatar');
  const role = searchParams.get('role');
  const surname = searchParams.get('surname');


  useEffect(() => {
    if(token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);


  useEffect(() => {
    if (accessToken) {
      dispatch(googleApi({ accessToken,  email, avatar, refreshToken, role, surname }));
      navigate('/')
    }
  }, [ dispatch,  accessToken,  email, avatar, refreshToken, role, surname]);

  
  return (
   <>
        <Routes>
          <Route path='/' element={<Home  />}/>
          <Route path='/membership' element={<Membership />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/trainers' element={<Trainers />}/>
          <Route path='/success' element={<SuccessVerified />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='*' element={<Home />}/>
        </Routes> 
   </>
  );
}



 

export default App;
