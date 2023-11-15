import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cl from "./NavbarDashboard.module.css";
import logo from "../../assets/logo.png";
import { useCustomSelector } from "../../redux/selectors";
import { Button } from "@mui/material";
import Modal from "../UI/modal/Modal";

const NavbarDashboard = () => {
  const { getUser: user, getQrCode: qrCode } = useCustomSelector();
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    console.log(user);
    console.log(qrCode);
  }, []);

  return (
    <>
      <div className={cl.containerLogo}>
        <Link to="/">
          <img className={cl.logo} src={logo} alt="Logo" />
        </Link>
      </div>
      <Button
        component="label"
        variant="contained"
        sx={{ marginTop: 2, bgcolor: "yellow", color: "black" }}
        onClick={() => setVisible(true)}
      >
        Generate qr code
      </Button>
      {user.role === "admin" || user.role === "manager" ? (
        <ul className={visible ? `${cl.navbar} + ${cl.active}` : cl.navbar}>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/my-membership">My memberships</Link>
          </li>
          <li>
            <Link to="/membership-dashboard">Memberships</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>

          <li>
            <Link to="/visits">Visits</Link>
          </li>
          <li>
            <Link to="/">Main page</Link>
          </li>
        </ul>
      ) : (
        <ul className={visible ? `${cl.navbar} + ${cl.active}` : cl.navbar}>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/my-membership">My membership</Link>
          </li>
          <li>
            <Link to="/visits">Visits</Link>
          </li>
          <li>
            <Link to="/">Main page</Link>
          </li>
        </ul>
      )}
      <Modal visible={visible} setVisible={setVisible}>
        <img style={{ backgroundColor: "#fff" }} src={qrCode} alt="qrCode" />
      </Modal>
    </>
  );
};

export default NavbarDashboard;
