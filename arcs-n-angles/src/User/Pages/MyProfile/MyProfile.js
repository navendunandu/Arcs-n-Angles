import React from 'react'
import { Box, Grid } from '@material-ui/core'
import './MyProfile.css'
import { Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import WcIcon from '@mui/icons-material/Wc';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MyProfile = () => {

  const [open, setOpen] = React.useState(false);
  const [popen, setPopen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handlePopen = () => setPopen(true);
  const handleClose = () => setOpen(false);
  const handlePclose = () => setPopen(false);

  const [userdata, setUserData] = useState([]);

  const fetchData = () => {
    var id = sessionStorage.getItem("uid");
    console.log("id");
    console.log(id);
    axios.get("http://localhost:4000/UserCond/" + id).then((response) => {
      var data = response.data.User;
      console.log(data);
      setUserData(data[0]);
      console.log(userdata.user_name);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={1} className='section pb_20 pt_20'>
      <Grid container spacing={1} className='top_align'>
        <Grid item className='section_title mb_20'>
          <h4 className='section_title_text'>My Profile</h4>
        </Grid>
        <Grid item className='section_title mb_20'>
          <Button onClick={handleOpen} className='edit_btn'>Edit<CreateIcon className='pbtn_icon' /></Button>
        </Grid>
      </Grid>
      <Grid xs={12} item className='section_profile ml_20'>
        <Grid className='profile_row'>
          <Typography variant="h1">{userdata.user_name}</Typography>
        </Grid>
        <Grid className='profile_row'>
          <Grid className='phead' item xs={6} md={1}><MailIcon /></Grid>
          <Grid item xs={6} md={10}>{userdata.user_email}</Grid>
        </Grid>
        <Grid className='profile_row'>
          <Grid className='phead' item xs={6} md={1}><ContactPhoneIcon /></Grid>
          <Grid item xs={6} md={11}>{userdata.user_contact}</Grid>
        </Grid>
        <Grid className='profile_row'>
          <Grid className='phead' item xs={6} md={1}><WcIcon /></Grid>
          <Grid item xs={6} md={11}>{userdata.user_gender}</Grid>
        </Grid>
        <Grid className='profile_row'>
          <Grid className='phead' item xs={6} md={1}><LocationCityIcon /></Grid>
          <Grid item xs={6} md={11}>{userdata.user_address}<br />{userdata.place_name}<br />{userdata.district_name}</Grid>
        </Grid>
        <Grid item className='section_title mb_20'>
          <Button onClick={handlePopen} className='edit_btn'>Change Password</Button>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" className='mb_1rem'>
            Edit Profile
          </Typography>

          <Box className='modal_form'
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField id="outlined-basic" fullWidth label="Name" variant="outlined" value={"Hari"} />
            </div>
            <div>
              <TextField id="outlined-basic" label="Email" variant="outlined" />
            </div>
            <div>
              <TextField id="outlined-basic" label="Contact" variant="outlined" />
            </div>
            <div>
              <TextareaAutosize
                id="outlined-basic" label="Address" variant="outlined"
                aria-label="minimum height"
                placeholder='Address'
                minRows={3}
                style={{ width: 430 }}
              />
            </div>
            <div className='modal_form'>
              <FormControl fullWidth className='modal_form' >
                <InputLabel id="demo-simple-select-label">District</InputLabel>
                <Select
                  defaultValue="Ernakulam"
                  fullWidth
                  varient="filled"
                  // onChange={(d) => setDistrict(d.target.value)}
                  label="District"
                  style={{ width: 430 }}
                >
                  <MenuItem value="">
                    <em>Select District</em>
                  </MenuItem>
                  <MenuItem selected value="MAlappuram">
                    <em>Malappuram</em>
                  </MenuItem>
                  <MenuItem value="Ernakulam">
                    <em>Ernakulam</em>
                  </MenuItem>
                  <MenuItem value="">
                    <em>kannur</em>
                  </MenuItem>
                  {/* {districts.map((d, key) => (
                    <MenuItem key={key} value={d.district_id}>
                      {d.district_name}
                    </MenuItem>
                  ))} */}
                </Select>
              </FormControl>
              <FormControl fullWidth className='modal_form' >
                <InputLabel id="demo-simple-select-label">Place</InputLabel>
                <Select
                  defaultValue="Kanjiramattom"
                  fullWidth
                  varient="filled"
                  // onChange={(d) => setDistrict(d.target.value)}
                  label="Place"
                  style={{ width: 430 }}
                >
                  <MenuItem value="">
                    <em>Select Place</em>
                  </MenuItem>
                  <MenuItem value="Aluva">
                    <em>Aluva</em>
                  </MenuItem>
                  <MenuItem value="Kanjiramattom">
                    <em>Kanjiramattom</em>
                  </MenuItem>
                  <MenuItem value="Perumbavoor">
                    <em>Perumbavoor</em>
                  </MenuItem>
                  {/* {districts.map((d, key) => (
                    <MenuItem key={key} value={d.district_id}>
                      {d.district_name}
                    </MenuItem>
                  ))} */}
                </Select>
              </FormControl>
            </div>
            <div>
              <Button onClick={handleClose} className='update_btn'>Update<CreateIcon className='pbtn_icon' /></Button>
            </div>

          </Box>

        </Box>
      </Modal>
      {/* Change Password */}
      <Modal
        open={popen}
        onClose={handlePclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" className='mb_1rem'>
            Change Password
          </Typography>

          <Box className='modal_form'
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField id="outlined-basic" fullWidth label="Old Password" type="password" variant="outlined" />
            </div>
            <div>
              <TextField id="outlined-basic" fullWidth label="New Password" type="password" variant="outlined" />
            </div>
            <div>
              <TextField id="outlined-basic" fullWidth label="Confirm Password" type="password" variant="outlined" />
            </div>
            <div>
              <Button onClick={handleClose} className='update_btn'>Update<CreateIcon className='pbtn_icon' /></Button>
            </div>

          </Box>

        </Box>
      </Modal>
    </Grid>
  )
}

export default MyProfile