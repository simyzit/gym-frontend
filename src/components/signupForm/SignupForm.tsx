import React, { FC, useState } from 'react';
import cl from './SignupFormStyles.module.css';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm, Controller, useFormState } from "react-hook-form";
import { emailValidation, firstNameValidation, passwordValidation, phoneValidation } from './validation';
import { fetchRegister, selectIsRegister } from '../../redux/slices/register';
import { AppDispatch, RootState } from '../../redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


interface ISignUpForm {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



const SignupForm: FC = () => {
  const dispatch = useAppDispatch();
  const {handleSubmit, control} = useForm<ISignUpForm>();
  const {errors} = useFormState({
    control
  });
  const isRegister = useAppSelector(selectIsRegister)


  const onSubmit:SubmitHandler<ISignUpForm> = async (values) => {
    const data = await dispatch(fetchRegister(values));

    console.log('register data', data.payload);
    
    if(!data.payload) {
      //show text "data is not correct"
    }
  }


  return (
    <div className={cl.signupForm}>
      {isRegister ? <Typography  variant='h5' component='div' color={'black'}>
        Success, check your email!
     </Typography> 
     : 
     <div>
      <Typography  variant='h5' component='div' color={'black'}>
        Sign up
     </Typography>
     <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
     <Controller 
        control={control}
        name='name'
        rules={firstNameValidation}
        render={({field}) => (
          <TextField 
            label="First name"
            size='small'
            margin='normal'
            className={cl.signupFormInput}
            fullWidth={true}
            onChange={(e) => field.onChange(e)}
            value={field.value}
            error={!!errors.name?.message}
            helperText={errors.name?.message}
          />
        )}      
      />
      <Controller 
        control={control}
        name='surname'
        rules={firstNameValidation}
        render={({field}) => (
          <TextField 
            label="Surname name"
            size='small'
            margin='normal'
            className={cl.signupFormInput}
            fullWidth={true}
            onChange={(e) => field.onChange(e)}
            value={field.value}
            error={!!errors.surname?.message}
            helperText={errors.surname?.message}
          />
        )}      
      />
      <Controller 
        control={control}
        name='email'
        rules={emailValidation}
        render={({field}) => (
          <TextField 
            label="Email"
            size='small'
            margin='normal'
            className={cl.authFormInput}
            fullWidth={true}
            onChange={(e) => field.onChange(e)}
            value={field.value}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
          />
        )}      
      />
       <Controller 
        control={control}
        name='phone'
        rules={phoneValidation}
        render={({field}) => (
          <TextField 
            label="Phone"
            size='small'
            margin='normal'
            className={cl.signupFormInput}
            fullWidth={true}
            onChange={(e) => field.onChange(e)}
            value={field.value}
            error={!!errors.phone?.message}
            helperText={errors.phone?.message}
          />
        )}      
      />
      <Controller 
        control={control}
        name='password'
        rules={passwordValidation}
        render={({field}) => (
          <TextField 
            label="Password"
            size='small'
            type='password'
            margin='normal'
            className={cl.authFormInput}
            fullWidth={true}
            onChange={(e) => field.onChange(e)}
            value={field.value}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
          />
        )}      
      />

         <Button type='submit' variant="contained" fullWidth={true} sx={{
          marginTop: 2,
     
         }}>Sign up</Button>
     </form>
     </div>
     }
     
    </div>
  )
}

export default SignupForm;