import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const User = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  const columns = [
    {
      field: "user_id",
      headerName: "ID",
    },
    {
      field: "user_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "user_contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "user_email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "user_address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "place_name",
      headerName: "Place",
      flex: 1,
    },
    {
      field: "district_name",
      headerName: "District",
      flex: 1,
    },
    {
      field: "user_gender",
      headerName: "Gender",
      flex: 1,
    },
  ];

  const fetchData = () => {
    axios.get("http://localhost:4000/User").then((response) => {
      var data = response.data.User;
      console.log(data);
      setRows(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .Name-column-cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-column": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid getRowId={(row) => row.user_id} rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default User;
