import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {DataGrid,  GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import cl from "./DashboardPage.module.css";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useCustomSelector } from "../../redux/selectors";
import { logout } from "../../redux/auth/authOperation";
import logo from "../../assets/logo.png";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
 
const DashboardPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const { getIsLoggedIn } = useCustomSelector();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);


  useEffect(() => {}, []);

  const users = [
    { 
      id: 1,
      email: "testuser@gmail.com",
      name: "testuser",
      surname: "test",
      avatarURL: "https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg",
      role: "user"
    },
    {
      id: 2,
      email: "alexcow@gmail.com",
      name: "testuser",
      surname: "test",
      avatarURL: "//www.gravatar.com/avatar/a18bf786efb76a3d56ee69a3b343952a?d=mp",
      role: "user"
    },
    {
      id: 3,
      email: "kolya@gmail.com",
      name: "testuser",
      surname: "test",
      avatarURL: "https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg",
      role: "admin"
    },
    {
      id: 4,
      email: "testuser@gmail.com",
      name: "testuser",
      surname: "test",
      avatarURL: "//www.gravatar.com/avatar/a18bf786efb76a3d56ee69a3b343952a?d=mp",
      role: "user"
    },
    {
      id: 5,
      email: "testuser@gmail.com",
      name: "testuser",
      surname: "test",
      avatarURL: "https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg",
      role: "admin"
    },
    {
      id: 6,
      email: "testuser@gmail.com",
      name: "testuser",
      surname: "test",
      avatarURL: "https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg",
      role: "user"
    },
    {
      id: 7,
      email: "alex@gmail.com",
      name: "testuser",
      surname: "test",
      avatarURL: "//www.gravatar.com/avatar/a18bf786efb76a3d56ee69a3b343952a?d=mp",
      role: "user"
    },
    {
      id: 8,
      email: "max@gmail.com",
      name: "testuser",
      surname: "test",
      avatarURL: "//www.gravatar.com/avatar/a18bf786efb76a3d56ee69a3b343952a?d=mp",
      role: "user"
    },
    {
      id: 9,
      email: "roob@gmail.com",
      name: "testuser",
      surname: "test",
      avatarURL: "https://as1.ftcdn.net/v2/jpg/01/88/77/70/1000_F_188777023_l0BzfxSZL3QfXa24dHX3SbxZUBOx0chb.jpg",
      role: "admin"
    },
  ]

  const columns = useMemo(() => [
    {field: 'avatarURL', headerName: 'Avatar', width: 100, renderCell: (params: { row: { avatarURL: string | undefined; }; }) => <Avatar src={params.row.avatarURL} />, sortable:false, filterable: false},
    {field: 'name', headerName: 'Name', width: 170},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'role', headerName: 'Role', width: 200},
    {field: 'id', headerName: 'Id', width: 220},
    
  ], [])

  const handleVisible = () => {
    setVisible(!visible);
  };

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  const onClickLogout = () => {
    dispatch(logout())
  }
 

  window.addEventListener("scroll", changeColor);

  return (
    <div className={cl.container}>
      <header className={cl.header}></header>
      <section className={cl.section}>
      <div className={cl.containerLogo}>
      <Link to="/">
        <img className={cl.logo} src={logo} alt="Logo" />
      </Link>
      </div>  
      <ul className={visible ? `${cl.navbar} + ${cl.active}` : cl.navbar}>
      <li>
          <Link to="/Profile">Profile</Link>
      </li>
      <li>
          <Link to="/users">Users</Link>
      </li>
      <li>
          <Link to="/memebships-manage">Memberships</Link>
      </li>
      </ul>
     
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

export default DashboardPage;