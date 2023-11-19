import React from "react";
import success from "../assets/success.png";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessVisit = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/");
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
        <img style={{ height: 100 }} src={success} alt="success" />
        <Typography
          variant="h5"
          component="div"
          color={"#5A5A5A"}
          sx={{ marginTop: "20px" }}
        >
          The visit was successful!
        </Typography>
        <p style={{ color: "gray", fontSize: 16 }}>Have a good training!</p>
        <Button
          onClick={() => onSubmit()}
          variant="contained"
          sx={{ width: "12%" }}
        >
          Ok
        </Button>
      </div>
    </div>
  );
};

export default SuccessVisit;
