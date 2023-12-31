import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo } from "react";
import { useCustomSelector } from "../../redux/selectors";
import { AppDispatch, RootState } from "../../redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import cl from "./OrdersDashboard.module.css";

import NavbarDashboard from "../navigateDashboard/NavbarDashboard";
import { fetchOrders } from "../../redux/order/orderOperation";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Orders = () => {
  const dispatch = useAppDispatch();
  const { getAllOrders } = useCustomSelector();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 170 },
      { field: "createdAt", headerName: "Created At", width: 200 },
      { field: "updatedAt", headerName: "Updated At", width: 200 },
      { field: "userName", headerName: "User name", width: 100 },
      { field: "packageName", headerName: "Package name", width: 220 },
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
            Manage orders
          </Typography>
          <DataGrid
            columns={columns}
            rows={getAllOrders}
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

export default Orders;
