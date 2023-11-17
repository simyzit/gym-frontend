import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cl from "./NavbarDashboard.module.css";
import logo from "../../assets/logo.png";
import { useCustomSelector } from "../../redux/selectors";
import { Box, Button, Modal } from "@mui/material";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../redux/auth/authOperation";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export const useAppDispatch: () => AppDispatch = useDispatch;

const NavbarDashboard = () => {
  const dispatch = useAppDispatch();
  const {
    getUser: user,
    getQrCode: qrCode,
    getToken: token,
  } = useCustomSelector();
  const [visible, setVisible] = useState<boolean>(false);

  const handleClose = () => setVisible(false);

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
      <Modal
        open={visible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={qrCode} alt="qrCode" />
        </Box>
      </Modal>
    </>
  );
};

export default NavbarDashboard;
