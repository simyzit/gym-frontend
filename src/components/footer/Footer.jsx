import React from "react";
import cl from "./Footer.module.css";
import logo from "../../assets/logo.png";
import {
  FaFacebook,
  FaHome,
  FaInstagram,
  FaMailBulk,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className={cl.footer}>
      <div className={cl.footerContainer}>
        <div className={cl.info}>
          <img src={logo} alt="Logo" className={cl.logo} />
          <p>
            Build strength and confidence at our gym with state-of-the-art
            equipment, personalized training, and a motivating community
          </p>
        </div>
        <div className={cl.adress}>
          <h2>Adress</h2>
          <p>Mariia Kapnist 10a. </p>
          <p>Kyiv, Ukraine.</p>
        </div>
        <div className={cl.contact}>
          <h2>Contact</h2>
          <div className={cl.phone}>
            <FaPhone size={20} style={{ color: "#fff", marginRight: "1rem" }} />
            <a href="tel:380676190201"> +380676190201</a>
          </div>
          <div className={cl.email}>
            <FaMailBulk
              size={20}
              style={{ color: "#fff", marginRight: "1rem" }}
            />
            <a href="malito:k4sportclub@gmail.com ">k4sportclub@gmail.com</a>
          </div>
          <div className={cl.social}>
            <a href="https://www.instagram.com/k4club/">
              <FaInstagram
                size={30}
                style={{ color: "#fff", marginRight: "1rem" }}
              />
            </a>
            <a href="https://www.facebook.com/p/%D0%9A4-%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%BA%D0%BB%D1%83%D0%B1_%D0%A8%D1%83%D0%BB%D1%8F%D0%B2%D0%BA%D0%B0-100067918989169/?paipv=0&eav=AfYuoY2teU5fp30449VC8B9icNmKN6168nXp36UJgBmEGfveLgH-zUZ2WQzB03bZHkE&_rdr">
              <FaFacebook
                size={30}
                style={{ color: "#fff", marginRight: "1rem" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
