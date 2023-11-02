
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavbarDashboard from '../navigateDashboard/NavbarDashboard'
import cl from "./ProfileDashboard.module.css";
import logo from "../../assets/logo.png";
import { useCustomSelector } from '../../redux/selectors';
import { fetchCurrentUser } from '../../redux/auth/authOperation';
import { useAppDispatch } from '../signinForm/SigninForm';
import { fetchUsers } from '../../redux/user/userOperation';

const ProfileDashboard = () => {
  const dispatch = useAppDispatch();
  const { getIsLoggedIn,  getToken: token, getUser } = useCustomSelector();

  useEffect(() => {
    if(token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const user = getUser;

  return (
    <div className={cl.container}>
      <header className={cl.header}></header>
      <section className={cl.section}>
      <div className={cl.containerLogo}>
      <Link to="/">
        <img className={cl.logo} src={logo} alt="Logo" />
      </Link>
      </div>  
      <NavbarDashboard />
      </section>
      <main className={cl.main}>
        <div style={{marginLeft: 30}}>
          <img style={{borderRadius:'50%'}} src={user.avatarURL} alt="ava" />
          <p> name: {user.name}</p>
          <p> surname: {user.surname}</p>
          <p> email: {user.email}</p>
          <p> role: {user.role}</p>
        </div>
       
      </main>
    </div>
  )
}

export default ProfileDashboard;