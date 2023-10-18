import React, { FC } from "react";
import cl from "./MembershipCardStyles.module.css";
import checkIcon from "../../assets/icon_check.svg";


interface IMembership {
  name: string;
  price: string;
  items: Array<string>;
}

const memberships: IMembership[] = [
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


const MembershipCard: FC = () => {
  
  return (
    <div className={cl.membership}>
      <h1>Gym Membership</h1>
      <div className={cl.cardContainer}>
        {memberships.map((membership) => (
          <div className={cl.card}>
            <div className={cl.heading}>
              <h3>{membership.name}</h3>
              <h3>{membership.price}</h3>
            </div>
            <span className={cl.bar}></span>
            <div className={cl.membershipItemsContainer}>
              {membership.items.map((item, index) => (
                <div className={cl.item} key={index}>
                  <img src={checkIcon} alt="Check Icon" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <button className="btn">Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipCard;
