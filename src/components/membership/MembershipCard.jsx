import React from "react";
import cl from "./MembershipCardStyles.module.css";
import checkIcon from "../../assets/icon_check.svg";

const MembershipCard = ({ memberships }) => {
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
