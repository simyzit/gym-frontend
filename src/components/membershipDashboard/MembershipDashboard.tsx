
import React from 'react'
import { Link } from 'react-router-dom'
import NavbarDashboard from '../navigateDashboard/NavbarDashboard'
import cl from "./MembershipDashboard.module.css";
import logo from "../../assets/logo.png";
import MembershipCard from '../membershipCard/MembershipCard';
import { TextField, Typography } from '@mui/material';

const MembershipDashboard = () => {
  return (
    <div className={cl.container}>
      <header className={cl.header}></header>
      <section className={cl.section}> 
      <NavbarDashboard />
      </section>
      <main className={cl.main}>
      <Typography
      variant="h5"
      component="h5"
      sx={{textAlign: "center", mt:3, mb: 3}}
      >
        Manage memberships
      </Typography>
       <MembershipCard isAdmin={true}/>
      </main>
    </div>
  )
}

export default MembershipDashboard