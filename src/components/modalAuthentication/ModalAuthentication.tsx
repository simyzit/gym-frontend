import React, { FC } from 'react'
import SigninForm from '../signinForm/SigninForm'
import Modal from '../UI/modal/Modal'
import { Box, Tab, Tabs, Typography } from '@mui/material';
import SignupForm from '../signupForm/SignupForm';

interface IModalAuthenticationProps {
  modal: boolean;
  setModal: (value: boolean) => void; 
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const ModalAuthentication: FC<IModalAuthenticationProps> = ({setModal , modal}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component='div'>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Modal visible={modal} setVisible={setModal}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Sign in" {...a11yProps(0)} />
              <Tab label="Sign up" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <SigninForm setModal={setModal}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SignupForm setModal={setModal} />
          </CustomTabPanel>
      </Box>    
    </Modal>

  )
}

export default ModalAuthentication