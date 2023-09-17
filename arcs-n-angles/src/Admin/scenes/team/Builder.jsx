import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import VerifiedIcon from '@mui/icons-material/Verified';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Modal from "@mui/material/Modal";
import * as React from "react";
import DownloadIcon from '@mui/icons-material/Download';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import useDownloader from 'react-use-downloader';

const Builder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [bname, setBname] = useState('');
  const [bproof, setBproof] = useState();
  const [bphoto, setBphoto] = useState('');
  const [brid, setBrid] = useState('');
  const [bvid, setBvid] = useState('none');

  const handleOpen = (bid) => {
    console.log(bid);
    axios.get(`http://localhost:4000/BuilderCond/${bid}`).then((response) => {
    var bdata = response.data.Builder[0];  
    setBname(bdata.builder_name);
    setBphoto(bdata.builder_photo);
    setBproof(bdata.builder_proof);
    setBrid(bdata.builder_id);
    setBvid(bdata.builder_vstatus);
    console.log(bdata.builder_name);
  });
    
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: "builder_id",
      headerName: "ID",
    },
    {
      field: "builder_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "builder_contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "builder_email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "builder_address",
      headerName: "Address",
      flex: 2,
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
      field: "builder_gender",
      headerName: "Gender",
    },
    {
      field: "builder_vstatus", 
      headerName: "Account Status",
      align: "center",
      renderCell: ({ row: { builder_vstatus, builder_id } }) => {
        return (
          <Button className="btn_status" onClick={()=>handleOpen(builder_id)}>
            {builder_vstatus === 0 && (
              <UnpublishedIcon className="status_icon" />
            )}
            {builder_vstatus === 1 && (
              <VerifiedIcon className="status_icon" />
            )}
            {builder_vstatus === 2 && (
              <NotInterestedIcon className="status_icon" />
            )}
          </Button>
        );
      },
  },
];

  const fetchData = () => {
    axios.get("http://localhost:4000/Builder").then((response) => {
      var data = response.data.Builder;
      console.log(data);
      setRows(data);
    });
  };

  const verify = (brid) => {
    axios.post(`http://localhost:4000//BuilderVer/${brid}`).then((response) => {
      alert(response.data.message);
      handleClose();
      fetchData();
    });
  }

  const reject = (brid) => {
    axios.post(`http://localhost:4000/BuilderRej/${brid}`).then((response) => {
      alert(response.data.message);
      handleClose();
      fetchData();
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { download } =
  useDownloader();

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Builders" />
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
          getRowId={(row) => row.builder_id}
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
            <img className="popUp_image" src={bphoto} alt={bphoto}/>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {bname}
          </Typography>
          <Box className="popUp_button">
            {/*Download button */}
            
            <Button onClick={() => download(bproof, bproof)}>Download file<DownloadIcon/></Button>
          </Box>
          <Box className="popUp_button" sx={{ display: bvid==0?'':'none' }}>
            {/* Accept reject Buttons */}
            <Button onClick={()=>verify(brid)}>Accept<TaskAltIcon/></Button>
            <Button onClick={()=>reject(brid)}>Reject<UnpublishedIcon/></Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Builder;
