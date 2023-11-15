import React, { FC, useEffect, useState } from "react";
import cl from "./MembershipCardStyles.module.css";
import checkIcon from "../../assets/icon_check.svg";
import { useCustomSelector } from "../../redux/selectors";
import { useAppDispatch } from "../signinForm/SigninForm";
import {
  buyPackage,
  deletePackage,
  editPackage,
  fetchAllPackages,
} from "../../redux/package/packageOperation";
import { IPackage } from "../../interfaces/package.interface";
import Loader from "../UI/loader/loader";
import { FaEdit } from "react-icons/fa";
import Modal from "../UI/modal/Modal";
import { Button, TextField, Typography } from "@mui/material";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IPropsMembershipCard {
  isAdmin?: boolean;
}

const MembershipCard: FC<IPropsMembershipCard> = ({ isAdmin }) => {
  const { getUser: user } = useCustomSelector();
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>("");
  const { getAllPackages } = useCustomSelector();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, control, getValues, setValue } =
    useForm<IPackage>({
      defaultValues: {
        name: "",
        description: [],
        days: 0,
        price: 0,
      },
    });
  const { errors } = useFormState({
    control,
  });

  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [dispatch]);

  const handleEdit = (value: IPackage) => {
    setValue("name", value.name);
    setValue("price", value.price);
    setValue("days", value.days);
    setCurrentId(value._id);
    setVisible(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deletePackage(id));
  };

  const onSubmit: SubmitHandler<IPackage> = (values) => {
    const data = { ...values, _id: currentId };
    dispatch(editPackage(data));
    setVisible(false);
  };

  const handleBuy = () => {
    dispatch(buyPackage(currentId));
    setVisibleConfirm(false);
  };

  return (
    <div className={cl.membership}>
      {!isAdmin ? <h1>Gym Membership</h1> : <></>}
      {getAllPackages?.length > 0 ? (
        <div className={cl.cardContainer}>
          {getAllPackages.map((membership) => (
            <div className={cl.card} key={membership._id}>
              {isAdmin ? (
                <div className={cl.iconContainer}>
                  <FaEdit
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(membership)}
                  />
                  <p
                    style={{ cursor: "pointer", color: "#fff" }}
                    onClick={() => handleDelete(membership._id)}
                  >
                    X
                  </p>
                </div>
              ) : (
                <></>
              )}

              <div className={cl.heading}>
                <h3>{membership.name}</h3>
                <h3>{membership.price}$</h3>
                <h3>
                  {membership.days > 1
                    ? membership.days + "days"
                    : membership.days + "day"}{" "}
                </h3>
              </div>

              <span className={cl.bar}></span>
              <div className={cl.membershipItemsContainer}>
                {membership.description.map((item, index) => (
                  <div className={cl.item} key={index}>
                    <img src={checkIcon} alt="Check Icon" />
                    <p style={{ color: "white" }}>{item}</p>
                  </div>
                ))}
              </div>

              <button
                className="btn"
                onClick={() => {
                  setVisibleConfirm(true);
                  setCurrentId(membership._id);
                }}
              >
                Buy
              </button>
            </div>
          ))}
          <Modal visible={visibleConfirm} setVisible={setVisibleConfirm}>
            <p>Are you sure?</p>
            <Button
              variant="contained"
              fullWidth={true}
              sx={{
                marginTop: 2,
              }}
              onClick={() => handleBuy()}
            >
              Sure
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth={true}
              sx={{
                marginTop: 2,
              }}
              onClick={() => setVisibleConfirm(false)}
            >
              Not sure
            </Button>
          </Modal>
          <Modal visible={visible} setVisible={setVisible}>
            <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
              <Typography style={{ fontSize: 16 }} variant="h5" color={"black"}>
                You can change fields
              </Typography>
              <Controller
                control={control}
                name="name"
                render={() => (
                  <TextField
                    label="Name card"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                    error={!!errors.name?.message}
                    helperText={errors.name?.message}
                    {...register("name")}
                  />
                )}
              />
              <Controller
                control={control}
                name="price"
                render={() => (
                  <TextField
                    label="Price"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                    error={!!errors.price?.message}
                    helperText={errors.price?.message}
                    {...register("price")}
                  />
                )}
              />
              <Controller
                control={control}
                name="days"
                render={() => (
                  <TextField
                    label="Days"
                    size="small"
                    margin="normal"
                    fullWidth={true}
                    error={!!errors.days?.message}
                    helperText={errors.days?.message}
                    {...register("days")}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth={true}
                sx={{
                  marginTop: 2,
                }}
              >
                Submit
              </Button>
            </form>
          </Modal>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MembershipCard;
