import React, { FC, useState } from "react";
import cl from "./NavbarStyles.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaBars, FaHome, FaTimes, FaUser } from "react-icons/fa";

interface INavbarProps {
  setModal?: (value: boolean) => void;
}

const Navbar: FC<INavbarProps> = ({setModal}  ) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false) 

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
        {!isAuth ?  <li
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <p onClick={() => setModal?.(true)}>Sign in</p>
          <FaUser size={15} style={{ color: "#fff" }} />
        </li>
        :   
         <li
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <p onClick={() => setModal?.(true)}>Log out</p>
        <FaUser size={15} style={{ color: "#fff" }} />
      </li>
      }
       
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
