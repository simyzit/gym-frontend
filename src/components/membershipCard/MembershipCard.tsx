import React, { FC, useEffect, useState } from "react";
import cl from "./MembershipCardStyles.module.css";
import checkIcon from "../../assets/icon_check.svg";
import { useCustomSelector } from "../../redux/selectors";
import { useAppDispatch } from "../signinForm/SigninForm";
import { fetchPackages } from "../../redux/package/packageOperation";
import { IPackage } from "../../interfaces/package.interface";
import Loader from "../UI/loader/loader";
import { FaCross, FaCrosshairs, FaEdit } from "react-icons/fa";

interface IPropsMembershipCard {
  isAdmin?: boolean,
}

const MembershipCard: FC<IPropsMembershipCard> = ({isAdmin}) => {
const { getAllPackages } = useCustomSelector();
const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  
  return (
    <div className={cl.membership}>
      {!isAdmin ? <h1>Gym Membership</h1> : <></>}
      {getAllPackages?.length > 0 ? 
      <div className={cl.cardContainer}>
      { getAllPackages.map((membership) => (
         <div className={cl.card} key={membership._id}>
           <div className={cl.heading}>
             <h3>{membership.name}</h3>
             <h3>{membership.price}$</h3>
             <h3>{membership.days > 1 ? membership.days + 'days' : membership.days  + 'day' } </h3>
           </div>
          
           <span className={cl.bar}></span>
           <div className={cl.membershipItemsContainer}>
             {membership.description.map((item, index) => (
               <div className={cl.item} key={index}>
                 <img src={checkIcon} alt="Check Icon" />
                 <p style={{color:'white'}}>{item}</p>
               </div>
             ))}
           </div>
           <button className="btn">Buy</button>
         </div>
       ))
      }
      </div>
      :  <Loader/>
      }
    </div>
  );
};

export default MembershipCard;
