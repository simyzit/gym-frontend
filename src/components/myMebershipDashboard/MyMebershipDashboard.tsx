import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo } from "react";
import { useCustomSelector } from "../../redux/selectors";
import { AppDispatch, RootState } from "../../redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import cl from "./MyMebershipDashboard.module.css";

import NavbarDashboard from "../navigateDashboard/NavbarDashboard";
import { fetchOrders } from "../../redux/order/orderOperation";
import { fetchPackages } from "../../redux/package/packageOperation";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const MyMebershipDashboard = () => {
  const dispatch = useAppDispatch();
  const { getPackages } = useCustomSelector();

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 170 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "description", headerName: "Description", width: 100 },
    ],
    []
  );

  return (
    <div className={cl.container}>
      <header className={cl.header}></header>
      <section className={cl.section}>
        <NavbarDashboard />
      </section>
      <main className={cl.main}>
        <Box
          sx={{
            height: 400,
            width: "90%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{ textAlign: "center", mt: 3, mb: 3 }}
          >
            My memberships
          </Typography>
          <DataGrid
            columns={columns}
            rows={getPackages}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </Box>
      </main>
    </div>
  );
};

export default MyMebershipDashboard;
