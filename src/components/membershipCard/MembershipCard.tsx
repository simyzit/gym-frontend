import React, { FC, useEffect, useState } from "react";
import cl from "./MembershipCardStyles.module.css";
import checkIcon from "../../assets/icon_check.svg";
import { useCustomSelector } from "../../redux/selectors";
import { useAppDispatch } from "../signinForm/SigninForm";
import {
  deletePackage,
  fetchPackages,
} from "../../redux/package/packageOperation";
import { IPackage } from "../../interfaces/package.interface";
import Loader from "../UI/loader/loader";
import { FaCross, FaCrosshairs, FaEdit } from "react-icons/fa";
import Modal from "../UI/modal/Modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm, useFormState } from "react-hook-form";
import { emailValidation } from "../signinForm/validation";

interface IPropsMembershipCard {
  isAdmin?: boolean;
}

const MembershipCard: FC<IPropsMembershipCard> = ({ isAdmin }) => {
  const [visible, setVisible] = useState<boolean>(false);
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
  const [price, setPrice] = useState<number>(0);
  const [days, setDays] = useState<number>(0);

  const handleChange = (event: SelectChangeEvent) => {
    setPrice(event.target.value as unknown as number);
  };

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  console.log(isAdmin);

  const handleEdit = (value: IPackage) => {
    setValue("name", value.name);
    setValue("price", value.price);
    setValue("days", value.days);
    setVisible(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deletePackage(id));
  };

  const onSubmit = () => {};

  return (
    <div className={cl.membership}>
      {!isAdmin ? <h1>Gym Membership</h1> : <></>}
      {getAllPackages?.length > 0 ? (
        <div className={cl.cardContainer}>
          {getAllPackages.map((membership) => (
            <div className={cl.card} key={membership._id}>
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

              <button className="btn">Buy</button>
            </div>
          ))}
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
