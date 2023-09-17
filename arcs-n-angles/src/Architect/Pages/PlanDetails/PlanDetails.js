import { Box, Button, ButtonBase, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import './PlanDetails.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CategoryIcon from '@mui/icons-material/Category';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FoundationIcon from '@mui/icons-material/Foundation';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import ReactThreeFbxViewer from "react-three-fbx-for-pyt";

let fbxUrl = require("./demo.fbx");

const PlanDetails = () => {

  sessionStorage.setItem("path", 'architect');

  let cameraPosition = {
    x: 150,
    y: 300,
    z: 350,
  };

  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState([]);
  const [file, setFile] = useState([]);
  const navigate = useNavigate();


  const buynow = (e) => {
    sessionStorage.setItem("email", email);
    var dat = {
      planid: plandata.plan_id,
      userid: sessionStorage.getItem('arid'),
    };
    axios.post("http://localhost:4000/PurchaseArch/" + plandata.project_id + "&" + sessionStorage.getItem('arid'))
      .then((response) => {
        var pid = response.data.Payment
        window.location = `/user/Payment/${pid}`;
        // navigate(``);
      });
    handleClose();

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { plid } = useParams();
  console.log(plid);
  const [plandata, setPlanData] = useState([]);

  const fetchPlanData = () => {
    axios.get(`http://localhost:4000/PlanCond/${plid}`).then((response) => {
      var data = response.data.PlanArchitect;
      console.log(data);
      setPlanData(data);
    });
  };

  const [image3d, setImage3d] = useState([]);

  const [vopen, setVOpen] = React.useState(false);
  const handleVOpen = (e) => {
    setVOpen(true);
    setImage3d(e);
  }
  const handleVClose = () => setVOpen(false);
  const [dopen, setDOpen] = React.useState(false);
  const handleDClose = () => setDOpen(false);
  const handleDOpen = (e) => {
    setDOpen(true);
  }

  useEffect(() => {
    fetchPlanData();
    fetch3d();
  }, []);

  let formData = new FormData();

  const upload3d = () => {
    console.log("file:", file);
    formData.append("file3d", file);
    formData.append("projectid", plid);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post("http://localhost:4000/upload3d", formData, config)
      .then((response) => {
        alert(response.data.message);
        handleDClose();
      });
  }

  const [render, setRender] = useState([]);

  const fetch3d = () => {
    axios.get(`http://localhost:4000/upload3d/${plid}`).then((response) => {
      var data = response.data.Render;
      console.log(data.gallery_image);
      setRender(data.gallery_image);
    });
  }
  console.log(render);
  return (
    <Grid container spacing={2} p={3} className='section pb_20 pt_20 project_section'>
      <Grid pb={2} className="project_title">
        <Typography variant='h5' className='project_category project_capitalize'>{plandata.category_name}</Typography>
        <span className='project_seperator'>•</span>
        <Typography variant='h5' className='project_capitalize'>{plandata.project_title}</Typography>
      </Grid>
      <Grid className='project_image'>
        <img src={plandata.project_photo} width="700px" alt="photo" />
      </Grid>
      <Grid className='plan_button'>
        <Button className='plan_3dbutton btn_edit' onClick={() => handleVOpen(plandata.plan_3d)}>
          3D Preview <ViewInArIcon />
        </Button>
      </Grid>
      <Grid pt={1}>
        <Typography align='justify'>
          {plandata.project_details}
        </Typography>
      </Grid>
      <Grid className='project_section'>
        <Grid pt={2}>
          <Typography>
            <CategoryIcon className='project_icons' />{plandata.category_name}
          </Typography>
        </Grid>
        <Grid pt={2}>
          <Typography>
            <SubtitlesIcon className='project_icons' />{plandata.subcategory_name}
          </Typography>
        </Grid>
        <Grid pt={2}>
          <Typography>
            <SquareFootIcon className='project_icons' />{plandata.project_area} sq.ft
          </Typography>
        </Grid>
        <Grid pt={2}>
          <Typography>
            <FoundationIcon className='project_icons' />{plandata.architect_name}
          </Typography>
        </Grid>
        <Grid pt={2}>
          <Typography>
            <CurrencyRupeeIcon className='project_icons' />{plandata.project_cost}
          </Typography>
        </Grid>
      </Grid>
      <Grid className='plan_buttons'>
        <Button variant="contained" onClick={handleDOpen} className='project_button btn_edit'>Add 3D File<ChatIcon /></Button>
        <Button variant="contained" onClick={handleClickOpen} className='project_button btn_buy'>Delete Post<ShoppingCartIcon /></Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Buy Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting the post will remove the entire data. You cannot recover the post. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={buynow}>Delete</Button>
        </DialogActions>
      </Dialog>
      {/* 3D Preview Box */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={vopen}
        onClose={handleVClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={vopen}>
          <Box className='plan_3dbox'>
            <ReactThreeFbxViewer className="plan_3d"
              width={1163}
              height={500}
              cameraPosition={cameraPosition}
              url={render}
            />
          </Box>
        </Fade>
      </Modal>

      {/* 3D add Box */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={dopen}
        onClose={handleDClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box className='upload3d'>
          <h3>Add 3D Rendering</h3>
          <Button variant="contained" component="label">
            Upload 3D File
            {/* <AddPhotoAlternateIcon /> */}
            <input hidden multiple type="file" onChange={(e) => setFile(e.target.files[0])} />
          </Button>
          <Button variant="contained" component="label" sx={{ width: '60px' }} onClick={upload3d}>Upload</Button>
        </Box>
      </Modal>

    </Grid>



  )
}

export default PlanDetails