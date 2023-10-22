import React from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import avaMasha from "../../assets/masha.jpg";
import avaAlex from "../../assets/alex.jpg";
import avaOleg from "../../assets/oleg.jpg";
import avaMarina from "../../assets/marina.jpg";
import cl from "./TrainersStuffStyles.module.css";

const TrainersStuff = () => {
  const trainers = [
    { id: 1, name: "Alex Kolobko", url: avaAlex },
    { id: 2, name: "Masha Viter", url: avaMasha },
    { id: 3, name: "Oleg Bulba", url: avaOleg },
    { id: 4, name: "Marina Solovey", url: avaMarina },
    { id: 5, name: "Masha Olegovna", url: avaMasha },
    { id: 6, name: "Oleg Kuchko", url: avaOleg },
    { id: 7, name: "Masha Viter", url: avaMasha },
    { id: 8, name: "Marina Solovey", url: avaMarina },
  ];

  return (
    <div className={cl.trainers}>
      <h1>Trainers stuff</h1>
      <div className={cl.trainersContainer}>
        {trainers.map((trainer) => (
          <div className={cl.card} key={trainer.id}>
            <img
              className={cl.avaImage}
              style={{ backgroundImage: `url(${trainer.url})` }}
            ></img>
            <h2 style={{ color: "#fff" }}>{trainer.name}</h2>
            <div className={cl.iconContainer}>
              <a href="https://www.instagram.com/k4club/">
                <FaInstagram size={30} style={{ color: "#fff" }} />
              </a>
              <a href="https://www.instagram.com/k4club/">
                <FaTwitter size={30} style={{ color: "#fff" }} />
              </a>
              <a href="https://www.instagram.com/k4club/">
                <FaYoutube size={30} style={{ color: "#fff" }} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainersStuff;
