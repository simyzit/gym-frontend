import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import HeroImg2 from "../components/heroImg2/HeroImg2";
import AboutUs from "../components/aboutUs/AboutUs";

function About() {
  return (
    <div>
      <Navbar />
      <HeroImg2 heading={"About us"} text={"K4 is a leading fitness center"} />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default About;
