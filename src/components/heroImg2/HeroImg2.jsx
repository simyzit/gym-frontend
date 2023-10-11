import React from "react";
import cl from "./HeroImg2Styles.module.css";
import introBgImg from "../../assets/intro_bg.jpg";

const HeroImg2 = ({ heading, text }) => {
  return (
    <div className={cl.heroImg}>
      <div className={cl.heading}>
        <h1>{heading}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default HeroImg2;
