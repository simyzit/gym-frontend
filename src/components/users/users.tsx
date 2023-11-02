import { Avatar, Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useMemo, useState } from 'react'
import { useCustomSelector } from '../../redux/selectors';
import { fetchUsers } from '../../redux/user/userOperation';
import { AppDispatch, RootState } from '../../redux/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, logout } from '../../redux/auth/authOperation';
import { Link } from 'react-router-dom';
import cl from "./users.module.css";
import logo from "../../assets/logo.png";
import NavbarDashboard from '../navigateDashboard/NavbarDashboard';
import { IUser } from '../../interfaces/user.interface';


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
 
const Users = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const { getAllUsers } = useCustomSelector();
  const { getIsLoggedIn,  getToken: token, getUser } = useCustomSelector();

  useEffect(() => {
    if(token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);
  
  let users = [];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log(getAllUsers);
  console.log(getUser);
  
  

  users = [  { 
    id: "1",
    email: "testuser@gmail.com",
    name: "testuser",
    surname: "test",
    avatarURL: "https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg",
    role: "user"
  },
  {
    id: "2",
    email: "alexcow@gmail.com",
    name: "testuser",
    surname: "test",
    avatarURL: "//www.gravatar.com/avatar/a18bf786efb76a3d56ee69a3b343952a?d=mp",
    role: "user"
  },
  {
    id: "3",
    email: "kolya@gmail.com",
    name: "testuser",
    surname: "test",
    avatarURL: "https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg",
    role: "admin"
  },
  {
    id: "4",
    email: "testuser@gmail.com",
    name: "testuser",
    surname: "test",
    avatarURL: "//www.gravatar.com/avatar/a18bf786efb76a3d56ee69a3b343952a?d=mp",
    role: "user"
  },
  {
    id: "5",
    email: "testuser@gmail.com",
    name: "testuser",
    surname: "test",
    avatarURL: "https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg",
    role: "admin"
  },
  {
    id: "6",
    email: "testuser@gmail.com",
    name: "testuser",
    surname: "test",
    avatarURL: "https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg",
    role: "user"
  },
  {
    id: "7",
    email: "alex@gmail.com",
    name: "testuser",
    surname: "test",
    avatarURL: "//www.gravatar.com/avatar/a18bf786efb76a3d56ee69a3b343952a?d=mp",
    role: "user"
  },
  {
    id: "8",
    email: "max@gmail.com",
    name: "testuser",
    surname: "test",
    avatarURL: "//www.gravatar.com/avatar/a18bf786efb76a3d56ee69a3b343952a?d=mp",
    role: "user"
  },
  {
    id: "9",
    email: "roob@gmail.com",
    name: "testuser",
    surname: "test",
    avatarURL: "https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg",
    role: "admin"
  }];
  

 
  

  const columns = useMemo(() => [
    {field: 'avatarURL', headerName: 'Avatar', width: 100, renderCell: (params: { row: { avatarURL: string | undefined; }; }) => <Avatar src={params.row.avatarURL} />, sortable:false, filterable: false},
    {field: 'name', headerName: 'Name', width: 170},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'role', headerName: 'Role', width: 200},
    {field: '_id', headerName: 'Id', width: 220},
    
  ], [])

  const handleVisible = () => {
    setVisible(!visible);
  };

  const onClickLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={cl.container}>
      <header className={cl.header}></header>
      <section className={cl.section}>
      <div className={cl.containerLogo}>
      <Link to="/">
        <img className={cl.logo} src={logo} alt="Logo" />
      </Link>
      </div>  
      <NavbarDashboard />
      </section>
      <main className={cl.main}>
      <Box
        sx={{
          height: 400,
          width:'90%',
          margin: '0 auto'
        }}
      >
    <Typography
      variant="h5"
      component="h5"
      sx={{textAlign: "center", mt:3, mb: 3}}
    >
      Manage users
    </Typography>
    <DataGrid 
      columns={columns}
      rows={users}
      getRowId={row => row.id}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
   </Box>
      </main>
    </div>
  )
}

export default Users;