import React from "react";
import verified from "../assets/verified.png";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../App";
import { useCustomSelector } from "../redux/selectors";
import { instance } from "../axios";

const VerifeidAgain = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getUser: user } = useCustomSelector();

  const onSubmit = () => {
    // dispatch(verifiedAgain(user.email));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6796f0d9",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          height: "80vh",
          width: "60vw",
          borderRadius: 20,
          gap: 20,
        }}
      >
        <img style={{ height: 100 }} src={verified} alt="success" />
        <Typography
          variant="h5"
          component="div"
          color={"#5A5A5A"}
          sx={{ marginTop: "20px" }}
        >
          Email verification link expired
        </Typography>
        <p style={{ color: "gray", fontSize: 16 }}>
          Looks like the verification link expired. Not to worry, we can send
          the link again.
        </p>
        <Button
          onClick={() => onSubmit()}
          variant="contained"
          sx={{ width: "30%" }}
        >
          Resend verification link
        </Button>
        <p
          onClick={() => navigate("/")}
          style={{
            color: "blue",
            fontSize: 14,
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          Home page
        </p>
      </div>
    </div>
  );
};

export default VerifeidAgain;
