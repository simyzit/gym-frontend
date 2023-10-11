import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import HeroImg2 from "../components/heroImg2/HeroImg2";
import TrainersStuff from "../components/trainersStuff/TrainersStuff";

const Trainers = () => {
  return (
    <div>
      <Navbar />
      <HeroImg2 heading={"Trainers"} text={"K4 has best trainers"} />
      <TrainersStuff />
      <Footer />
    </div>
  );
};

export default Trainers;
