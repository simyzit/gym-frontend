import React, { FC } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import HeroImg2 from "../components/heroImg2/HeroImg2";
import MembershipCard from "../components/membershipCard/MembershipCard";

function Membership () {
  return (
    <div>
      <Navbar />
      <HeroImg2
        heading={"Gym memberships"}
        text={"You can choose special offer"}
      />
      <MembershipCard  />
      <Footer />
    </div>
  );
}

export default Membership;
