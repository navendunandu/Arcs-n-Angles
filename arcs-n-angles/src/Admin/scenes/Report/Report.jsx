import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Report = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumns = ["ID", "Date", "Title", "Price", "Status"];
    const tableRows = [];
    let index = 1;
  
    rows.forEach((row) => {
      const rowData = [index, row.purchase_date, row.project_title, row.project_cost, row.purchase_status === 0 ? "Cancelled" : "Verified"];
      tableRows.push(rowData);
      index++;
    });
  
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
    });
  
    doc.save("purchase_report.pdf");
  };
  

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "purchase_date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "project_title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "project_cost",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "purchase_status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { purchase_status } }) => {
        return (
          <>
            {purchase_status === 0 && <CancelIcon className="status_icon" />}
            {purchase_status === 1 && <VerifiedIcon className="status_icon" />}
          </>
        );
      },
    },
  ];

  const rowsWithId = rows.map((row, index) => ({ ...row, id: index + 1 }));

  const fetchData = () => {
    axios.get("http://localhost:4000/purchasereport").then((response) => {
      var data = response.data.Purchase;
      console.log(data);
      setRows(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="REPORT" subtitle="Purchase Reports" />
      <Button variant="contained" onClick={downloadPDF}>
        Download PDF
      </Button>
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
        <DataGrid
          rows={rowsWithId}
          columns={columns}
          getRowId={(row) => row.id}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Report;
