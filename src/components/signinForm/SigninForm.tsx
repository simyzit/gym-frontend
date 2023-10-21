import React, { FC } from 'react';

import cl from './SigninFormStyles.module.css';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm, Controller, useFormState } from "react-hook-form";
import { emailValidation, passwordValidation } from './validation';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../redux/store';
import { ISignInFormProps } from '../../interfaces/appInterfaces.intreface';
import {  useNavigate } from 'react-router-dom';
import { login } from '../../redux/auth/authOperation';
import { ILoginUser } from '../../interfaces/user.interface';
import { useCustomSelector } from '../../redux/selectors';


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector




const SigninForm: FC<ISignInFormProps> = ({setModal}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {handleSubmit, control} = useForm<ILoginUser>();
  const { getIsLoggedIn } = useCustomSelector();
  const {errors} = useFormState({
    control
  });

  const onSubmit = async (values: ILoginUser) => {    
    if(!values){
      return
    }

    await dispatch(login(values));
   
    
    setModal(false);
    navigate('/')
    
    
   
  }


  return (
    <div className={cl.signinForm}>
     <Typography  variant='h5' component='div' color={'black'} >
        Sign in
     </Typography>
     <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller 
        control={control}
        name='email'
        rules={emailValidation}
        render={({field}) => (
          <TextField 
            label="Email"
            size='small'
            margin='normal'
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
     
         }}>Sign in</Button>
     </form>
    </div>
  )
}

export default SigninForm;