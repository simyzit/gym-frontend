import React, { useState } from "react";
import cl from "./NavbarStyles.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? `${cl.header} + ${cl.headerBg}` : cl.header}>
      <Link to="/">
        <img className={cl.logo} src={logo} alt="Logo" />
      </Link>
      <ul className={visible ? `${cl.navbar} + ${cl.active}` : cl.navbar}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/membership">Membership</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/trainers">Trainers</Link>
        </li>
      </ul>
      <div className={cl.hamburger} onClick={handleVisible}>
        {visible ? (
          <FaTimes size={20} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={20} style={{ color: "#fff" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
