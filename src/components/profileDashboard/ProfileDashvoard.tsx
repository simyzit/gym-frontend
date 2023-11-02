
import React from 'react'
import { Link } from 'react-router-dom'
import NavbarDashboard from '../navigateDashboard/NavbarDashboard'
import cl from "./ProfileDashboard.module.css";
import logo from "../../assets/logo.png";

const ProfileDashboard = () => {
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
        <p>Profile</p>
      </main>
    </div>
  )
}

export default ProfileDashboard;