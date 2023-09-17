import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import Modal from "@mui/material/Modal";
import * as React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import useDownloader from "react-use-downloader";

const Architect = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [aname, setAname] = useState("name");
  const [aproof, setAproof] = useState();
  const [aphoto, setAphoto] = useState("photo");
  const [arid, setArid] = useState("id");

  const handleOpen = (aid) => {
    console.log(aid);
    axios.get(`http://localhost:4000/ArchitectCond/${aid}`).then((response) => {
      var adata = response.data.Architect[0];
      setAname(adata.architect_name);
      setAphoto(adata.architect_photo);
      setAproof(adata.architect_proof);
      setArid(adata.architect_id);
      console.log(adata.architect_name);
    });

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: "architect_id",
      headerName: "ID",
    },
    {
      field: "architect_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "architect_contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "architect_email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "architect_address",
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
      field: "architect_gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "architect_vstatus",
      headerName: "Account Status",
      align: "center",
      renderCell: ({ row: { architect_vstatus, architect_id } }) => {
        return (
          <Button
            className="btn_status"
            onClick={() => handleOpen(architect_id)}
          >
            {architect_vstatus === 0 && (
              <UnpublishedIcon className="status_icon" />
            )}
            {architect_vstatus === 1 && (
              <VerifiedIcon className="status_icon" />
            )}
            {architect_vstatus === 2 && (
              <NotInterestedIcon className="status_icon" />
            )}
          </Button>
        );
      },
    },
  ];

  const fetchData = () => {
    axios.get("http://localhost:4000/Architect").then((response) => {
      var data = response.data.Architect;
      console.log(data);
      setRows(data);
    });
  };

  const verify = (arid) => {
    axios
      .post(`http://localhost:4000/ArchitectVer/${arid}`)
      .then((response) => {
        alert(response.data.message);
        handleClose();
        fetchData();
      });
  };

  const reject = (arid) => {
    axios
      .post(`http://localhost:4000/ArchitectRej/${arid}`)
      .then((response) => {
        alert(response.data.message);
        handleClose();
        fetchData();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { download } = useDownloader();

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Architects" />
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
          getRowId={(row) => row.architect_id}
          rows={rows}
          columns={columns}
          
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="popUp">
          <Box>
            <img className="popUp_image" src={aphoto} />
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {aname}
          </Typography>
          <Box className="popUp_button">
            {/*Download button */}

            <Button onClick={() => download(aproof, aproof)}>
              Download file
              <DownloadIcon />
            </Button>
          </Box>
          <Box className="popUp_button">
            {/* Accept reject Buttons */}
            <Button onClick={() => verify(arid)}>
              Accept
              <TaskAltIcon />
            </Button>
            <Button onClick={() => reject(arid)}>
              Reject
              <UnpublishedIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Architect;
