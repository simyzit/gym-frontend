import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => (
  <div style={{display:'flex', justifyContent: 'center'}}>
    <CircularProgress color="primary"/>
  </div>  
  

)

export default Loader