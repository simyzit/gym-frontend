import React, { FC } from 'react';
import cl from './SignupFormStyles.module.css';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm, Controller, useFormState } from "react-hook-form";
import { emailValidation, firstNameValidation, passwordValidation } from './validation';

interface ISignUpForm {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  password: string
}


const SignupForm: FC = () => {
  const {handleSubmit, control} = useForm<ISignUpForm>();
  const {errors} = useFormState({
    control
  });

  const onSubmit:SubmitHandler<ISignUpForm> = (data) => console.log(data)


  return (
    <div className={cl.signupForm}>
     <Typography  variant='h5' component='div' color={'black'}>
        Sign up
     </Typography>
     <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
     <Controller 
        control={control}
        name='firstName'
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
            error={!!errors.firstName?.message}
            helperText={errors.firstName?.message}
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
        rules={firstNameValidation}
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
  )
}

export default SignupForm;