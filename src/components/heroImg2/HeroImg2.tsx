import React, { FC } from "react";
import cl from "./HeroImg2Styles.module.css";
import introBgImg from "../../assets/intro_bg.jpg";

interface IHeroImg2Props {
  heading: string;
  text: string;
}

const HeroImg2: FC<IHeroImg2Props> = ({ heading, text }) => {
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
