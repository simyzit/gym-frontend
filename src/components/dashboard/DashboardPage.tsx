import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {DataGrid,  GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import cl from "./DashboardPage.module.css";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useCustomSelector } from "../../redux/selectors";
import { logout } from "../../redux/auth/authOperation";
import logo from "../../assets/logo.png";
import NavbarDashboard from "../navigateDashboard/NavbarDashboard";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
 
const DashboardPage = () => {
 
  const [color, setColor] = useState<boolean>(false);
  const { getIsLoggedIn } = useCustomSelector();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {}, []);

  const onClickLogout = () => {
    dispatch(logout())
  }
 

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
        <p>Dashboard</p>
      </main>
    </div>
  )
}

export default DashboardPage;