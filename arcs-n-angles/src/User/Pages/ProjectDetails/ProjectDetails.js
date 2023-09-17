import { Box, Button, ButtonBase, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './ProjectDetails.css'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CategoryIcon from '@mui/icons-material/Category';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FoundationIcon from '@mui/icons-material/Foundation';
import ChatIcon from '@mui/icons-material/Chat';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {

  const [eopen, setEOpen] = React.useState(false);
  const handleEOpen = () => setEOpen(true);
  const handleEClose = () => setEOpen(false);
  const [gopen, setGOpen] = React.useState(false);

  const { prid } = useParams();
  const [projectphoto, setProjectphoto] = useState([]);
  const [projectdetail, setProjectdetail] = useState([]);
  const [mainphoto, setMainphoto] = useState([]);

  const fetchProjectData = () => {
    axios.get(`http://localhost:4000/ProjectGallery/${prid}`).then((response) => {
      var data = response.data.Gallery;
      console.log(response);
      setProjectphoto(data);
    });
  };

  const fetchProjectDetails = () => {
    axios.get(`http://localhost:4000/Projectcond/${prid}`).then((response) => {
      var data = response.data.Project;
      setProjectdetail(data);
      setMainphoto(data.project_photo)
    });
  };

  useEffect(() => {
    fetchProjectData();
    fetchProjectDetails();
  }, []);




  const handleClickGOpen = () => {
    setGOpen(true);
  };

  const handleGClose = () => {
    setGOpen(false);
  };

  const [dopen, setDOpen] = React.useState(false);

  const handleClickDOpen = () => {
    setDOpen(true);
  };

  const handleDClose = () => {
    setDOpen(false);
  };

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
        <Typography variant='h5' className='project_category project_capitalize'>{projectdetail.category_name}</Typography>
        <span className='project_seperator'>•</span>
        <Typography variant='h5' className='project_capitalize'>{projectdetail.project_title}</Typography>
      </Grid>
      <Grid className='project_image'>
        <img className='project_frontphoto' src={mainphoto} alt="photo" />
      </Grid>
      <div style={{ height: '100px', overflow: 'hidden' }}>
        <Grid class="project_gallery" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          {
            projectphoto.map((image, index) => (

              <img onClick={() => setMainphoto(image.gallery_image)} className='projectgallery_images' src={image.gallery_image} />

            ))
          }
        </Grid>
      </div>
      <Grid pt={1}>
        <Typography align='justify'>
          {projectdetail.project_details}
        </Typography>
      </Grid>
      <Grid className='project_section'>
        <Grid pt={2}>
          <Typography>
            <CategoryIcon className='project_icons' />{projectdetail.category_name}
          </Typography>
        </Grid>
        <Grid pt={2}>
          <Typography>
            <SubtitlesIcon className='project_icons' />{projectdetail.subcategory_name}
          </Typography>
        </Grid>
        <Grid pt={2}>
          <Typography>
            <SquareFootIcon className='project_icons' />{projectdetail.project_area} sq.ft
          </Typography>
        </Grid>
        <Grid pt={2} className="project_location">
          <Grid>
            <LocationCityIcon className='project_icons' />
          </Grid>
          <Grid xs={12} className="project_locationname">
            <Grid className='project_place' >
              <Grid xs={1}>
                <Typography>
                  Place :
                </Typography>
              </Grid>
              <Typography>
                {projectdetail.place_name}
              </Typography>
            </Grid>
            <Grid xs={12} pt={2} className='project_city'>
              <Grid xs={1}>
                <Typography>
                  City :
                </Typography>
              </Grid>
              <Typography>
                {projectdetail.district_name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid pt={2}>
          <Typography>
            <FoundationIcon className='project_icons' />{projectdetail.builder_name}
          </Typography>
        </Grid>
      </Grid>
      <Grid className='project_buttons'>
        <NavLink to={`/user/chatbox/${projectdetail.builder_id}`}>
          <Button variant="contained" className='project_button btn_edit'>Know More<ChatIcon /></Button>
        </NavLink>
      </Grid>
      {/* Project Edit */}
      <Modal
        open={eopen}
        onClose={handleEClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='editproject_modal'>
          <Grid item xs={12} className="newproject_grid">
            <Grid item xs={8}>
              <TextField id="standard-basic" label="Project Title" fullWidth color='warning' variant="standard" />
            </Grid>
            <Grid item xs={4}>
              {/* <Button variant="contained" component="label">
                        Upload Project Photo  <PhotoCamera />
                        <input hidden accept="image/*" multiple type="file" />
                    </Button> */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-multiline-static"
              label="Project Details"
              multiline
              rows={4}
              variant="standard"
              fullWidth
              color='warning'
            />
          </Grid>
          <Grid item xs={12} className="newproject_grid">
            <Grid item xs={6}>
              <TextField id="standard-basic" label="Project Area" fullWidth color='warning' variant="standard" />
            </Grid>
            <Grid item xs={6}>
              <TextField id="standard-basic" label="Project Cost" fullWidth color='warning' variant="standard" />
            </Grid>
          </Grid>
          <Grid item xs={12} className="newproject_grid">
            <Grid item xs={6}>
              <FormControl variant="standard" color='warning' fullWidth sx={{ gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  defaultValue=""
                  fullWidth
                  varient="filled"
                  // onChange={(d) => setDistrict(d.target.value)}
                  label="Category"
                  x={{ gridColumn: "span 4" }}
                >
                  <MenuItem disabled value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {/* {districts.map((d, key) => (
                                <MenuItem key={key} value={d.district_id}>
                                    {d.district_name}
                                </MenuItem>
                            ))} */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth color='warning' variant="standard" sx={{ gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                <Select
                  defaultValue=""
                  fullWidth
                  varient="filled"
                  // onChange={(d) => setDistrict(d.target.value)}
                  label="Sub Category"
                  x={{ gridColumn: "span 4" }}
                >
                  <MenuItem disabled value="">
                    <em>Select Sub Category</em>
                  </MenuItem>
                  {/* {districts.map((d, key) => (
                                <MenuItem key={key} value={d.district_id}>
                                    {d.district_name}
                                </MenuItem>
                            ))} */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} className="newproject_grid">
            <Grid item xs={6}>
              <FormControl fullWidth color='warning' variant="standard" sx={{ gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-label" color='warning'>District</InputLabel>
                <Select
                  defaultValue=""
                  fullWidth
                  varient="filled"
                  // onChange={(d) => setDistrict(d.target.value)}
                  label="District"
                  x={{ gridColumn: "span 4" }}
                >
                  <MenuItem disabled value="">
                    <em>Select District</em>
                  </MenuItem>
                  {/* {districts.map((d, key) => (
                                <MenuItem key={key} value={d.district_id}>
                                    {d.district_name}
                                </MenuItem>
                            ))} */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth color='warning' variant="standard" sx={{ gridColumn: "span 4" }}>
                <InputLabel id="demo-simple-select-label" color='warning'>Place</InputLabel>
                <Select
                  defaultValue=""
                  fullWidth
                  varient="filled"
                  // onChange={(d) => setDistrict(d.target.value)}
                  label="Place"
                  x={{ gridColumn: "span 4" }}
                >
                  <MenuItem disabled value="">
                    <em>Select Place</em>
                  </MenuItem>
                  {/* {districts.map((d, key) => (
                                <MenuItem key={key} value={d.district_id}>
                                    {d.district_name}
                                </MenuItem>
                            ))} */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} className='.newproject_button'>
            <Button className='btn_upd_project' variant="contained">Update Project <SystemUpdateAltIcon /></Button>
          </Grid>
        </Box>
      </Modal>
      {/* Add Photos Gallery */}
      <Dialog open={gopen} onClose={handleGClose}>
        <DialogTitle>Add More Photos</DialogTitle>
        <DialogContent>
          <Button variant="contained" component="label">
            Upload Project Photo  <AddPhotoAlternateIcon />
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGClose}>Cancel</Button>
          <Button onClick={handleGClose}>Upload</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Pop Up */}
      <Dialog
        open={dopen}
        onClose={handleDClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete the project?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting the project will erase the entire things in the project and cannot be recovered!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDClose}>Proceed</Button>
          <Button onClick={handleDClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>

  )
}

export default ProjectDetails