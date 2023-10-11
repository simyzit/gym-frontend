import React from "react";
import Navbar from "../components/navbar/Navbar";
import HeroImg from "../components/heroImg/HeroImg";
import Footer from "../components/footer/Footer";
import Info from "../components/info/Info";
import AboutUs from "../components/aboutUs/AboutUs";
import TrainersStuff from "../components/trainersStuff/TrainersStuff";
import MembershipCard from "../components/membership/MembershipCard";

const Home = () => {
  const memberships = [
    {
      name: "Pass 'Trial'",
      price: "$0",
      items: [
        "Access to the gym from 8:00 to 14:00",
        "The trainer on duty will introduce you to the gym",
      ],
    },
    {
      name: "Pass ‘Easy Start’ ",
      price: "$119",
      items: [
        "Visit without restrictions 24/7",
        "Individual training program",
        "Access to the VTRAINER application",
        "Trainer support",
      ],
    },
    {
      name: "Pass ‘Free Time’ ",
      price: "$49",
      items: [
        "The entrance time to the gym is from 14:00 to 16:00",
        "Without suspension of gym membership",
        "The trainer on duty will introduce you to the gym",
      ],
    },
    {
      name: "Pass ‘1 Month 24/7’ ",
      price: "$85",
      items: [
        "Visit without restrictions 24/7",
        "The trainer on duty will introduce you to the gym",
      ],
    },
    {
      name: "Pass ‘In Shape (AM)’ ",
      price: "$165",
      items: [
        "Training in mini-groups until 14:00",
        "Without suspension of gym membership",
        "Classes with a trainer in a mini-group 3 times a week",
        "Trainer support",
      ],
    },
    {
      name: "Pass ‘In Shape (PM)’  ",
      price: "$195",
      items: [
        "Training in mini-groups until 17:00",
        "Without suspension of gym membership",
        "Classes with a trainer in a mini-group 3 times a week",
        "Trainer support",
      ],
    },
  ];

  return (
    <div>
      <Navbar />
      <HeroImg />
      <Info />
      <MembershipCard memberships={memberships} />
      <AboutUs />
      <TrainersStuff />
      <Footer />
    </div>
  );
};

export default Home;
