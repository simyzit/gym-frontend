import React from "react";
import cross from "../assets/cross.png";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UnsuccessVisit = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/membership");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F95959",
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
        <img style={{ height: 100 }} src={cross} alt="success" />
        <Typography
          variant="h5"
          component="div"
          color={"#5A5A5A"}
          sx={{ marginTop: "20px" }}
        >
          The visit was unsuccessful!
        </Typography>
        <p style={{ color: "gray", fontSize: 16 }}>
          You need to buy a new membership!
        </p>
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

export default UnsuccessVisit;
