import { Box, Button, ButtonBase, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import './PlanDetails.css'
import { styled } from '@mui/material/styles';
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

sessionStorage.setItem("path", 'builder');

const PlanDetails = () => {

  let cameraPosition = {
    x: 150,
    y: 300,
    z: 350,
  };




  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState([]);
  const navigate = useNavigate();


  const buynow = (e) => {
    sessionStorage.setItem("email", email);
    var dat = {
      planid: plandata.plan_id,
      userid: sessionStorage.getItem('bid'),
    };
    axios.post("http://localhost:4000/PurchaseBuilder/" + plandata.project_id + "&" + sessionStorage.getItem('bid'))
      .then((response) => {
        var pid = response.data.Payment
        navigate(`/user/Payment/${pid}`);
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

  const [render, setRender] = useState([]);

  const fetch3d = () => {
    axios.get(`http://localhost:4000/upload3d/${plid}`).then((response) => {
      var data = response.data.Render;
      console.log(data.gallery_image);
      setRender(data.gallery_image);
    });
  }

  useEffect(() => {
    fetchPlanData();
    fetch3d();
  }, []);

  const [image3d, setImage3d] = useState([]);
  const handleVClose = () => setVOpen(false);
  const [vopen, setVOpen] = React.useState(false);

  const handleVOpen = (e) => {
    setVOpen(true);
    setImage3d(e);
  }

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));

  return (
    <Grid container spacing={2} p={3} className='section pb_20 pt_20 project_section'>
      <Grid pb={2} className="project_title">
        <Typography variant='h5' className='project_category project_capitalize'>{plandata.category_name}</Typography>
        <span className='project_seperator'>•</span>
        <Typography variant='h5' className='project_capitalize'>{plandata.project_title}</Typography>
      </Grid>
      <Grid className='project_image'>
        <img src={plandata.project_photo} alt="photo" className='project_frontphoto' />
      </Grid>
      <Grid className='plan_button'>
        <Button className='plan_3dbutton btn_edit' onClick={() => handleVOpen(plandata.project_file)}>
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
        <NavLink to={`/user/chatboxarch/${plandata.architect_id}`}>
          <Button variant="contained" className='project_button btn_edit'>Know More<ChatIcon /></Button>
        </NavLink>
        <Button variant="contained" onClick={handleClickOpen} className='project_button btn_buy'>Buy Plan<ShoppingCartIcon /></Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Buy Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The plan will be send to the email you are going to provide after the payment. Please provide your email id.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={buynow}>Buy Now</Button>
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
        fullScreen
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

    </Grid>

  )
}

export default PlanDetails