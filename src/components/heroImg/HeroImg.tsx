import React, { FC } from "react";
import cl from "./HeroImgStyles.module.css";
import introBgImg from "../../assets/intro_bg.jpg";
import { Link } from "react-router-dom";

const HeroImg: FC = () => {
  return (
    <div className={cl.hero}>
      <div className={cl.mask}>
        <img className={cl.introImg} src={introBgImg} alt="IntroImg" />
      </div>
      <div className={cl.content}>
        <h1>Free trial session with a trainer</h1>
        <div>
          <Link to="/about" className="btn">
            Detailed
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroImg;
