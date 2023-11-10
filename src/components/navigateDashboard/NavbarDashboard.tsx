import React, { useState } from "react";
import { Link } from "react-router-dom";
import cl from "./NavbarDashboard.module.css";
import logo from "../../assets/logo.png";

const NavbarDashboard = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className={cl.containerLogo}>
        <Link to="/">
          <img className={cl.logo} src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className={visible ? `${cl.navbar} + ${cl.active}` : cl.navbar}>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/membership-dashboard">Memberships</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/">Main page</Link>
        </li>
      </ul>
    </>
  );
};

export default NavbarDashboard;