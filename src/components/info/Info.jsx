import React from "react";
import cl from "./Info.module.css";
import iconLine from "../../assets/icon_line.svg";
import iconFitnessZones from "../../assets/icon_ fitnessZones.svg";
import iconeEquipment from "../../assets/icon_ eqipment.svg";
import iconTime from "../../assets/icon_time.svg";

const Info = () => {
  return (
    <div className={cl.info}>
      <div className={cl.infoContainer}>
        <div className={cl.infoBlock}>
          <img src={iconLine} alt="Line" />
          <div>
            <h2>300 sq.m.</h2>
            <p>A spacious gym for sports – a safe distance </p>
            <p>between exercise machines</p>
          </div>
        </div>
        <div className={cl.infoBlock}>
          <img src={iconFitnessZones} alt="Line" />
          <div>
            <h2>4 fitness zones</h2>
            <p>A spacious gym for sports – a safe distance </p>
            <p>between exercise machines</p>
          </div>
        </div>
        <div className={cl.infoBlock}>
          <img src={iconeEquipment} alt="Line" />
          <div>
            <h2>More than 200 equipment</h2>
            <p>A spacious gym for sports – a safe distance </p>
            <p>between exercise machines</p>
          </div>
        </div>
        <div className={cl.infoBlock}>
          <img src={iconTime} alt="Line" />
          <div>
            <h2>Round-the-clock operation</h2>
            <p>A spacious gym for sports – a safe distance </p>
            <p>between exercise machines</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
