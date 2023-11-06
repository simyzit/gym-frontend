
import React from 'react'
import { Link } from 'react-router-dom'
import NavbarDashboard from '../navigateDashboard/NavbarDashboard'
import cl from "./OrdersDashboard.module.css";
import logo from "../../assets/logo.png";

const OrdersDashboard = () => {
  return (
    <div className={cl.container}>
      <header className={cl.header}></header>
      <section className={cl.section}>
      <NavbarDashboard />
      </section>
      <main className={cl.main}>
        <p>Orders</p>
      </main>
    </div>
  )
}

export default OrdersDashboard;