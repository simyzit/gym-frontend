import React, { FC, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import HeroImg from "../components/heroImg/HeroImg";
import Footer from "../components/footer/Footer";
import Info from "../components/info/Info";
import AboutUs from "../components/aboutUs/AboutUs";
import TrainersStuff from "../components/trainersStuff/TrainersStuff";
import MembershipCard from "../components/membershipCard/MembershipCard";
import Modal from "../components/UI/modal/Modal";
import AuthForm from "../components/signinForm/SigninForm";
import SignupForm from "../components/signupForm/SignupForm";
import ModalAuthentication from "../components/modalAuthentication/ModalAuthentication";


const Home: FC =()  => {
  const [modal, setModal] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Navbar setModal={setModal} />
      <HeroImg />
      <Info />
      <MembershipCard  />
      <AboutUs />
      <TrainersStuff /> 
      <Footer />
      <ModalAuthentication modal={modal} setModal={setModal} />
    </div>
  );
};

export default Home;
