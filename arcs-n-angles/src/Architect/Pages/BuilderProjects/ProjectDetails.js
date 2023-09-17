import { Box, Button, ButtonBase, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './BuilderProjects.css'
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
  const [gallery, setGallery] = useState([]);

  

  const inputgallery = () => {
    let formData = new FormData();
    gallery.forEach((file) => { 
      formData.append('Images', file); 
    });
    formData.append("bid", sessionStorage.getItem('bid'))
    const config = {
      headers: { "content-type": "multipart/form-data" },};
  axios.post("http://localhost:4000/ProjectGallery/",formData, config).then((response) => {
      alert(response.data.message);
      handleGClose();
    })
}

  const fetchProjectData = () => {
    axios.get(`http://localhost:4000/ProjectGallery/${prid}`).then((response) => {
      var data = response.data.Gallery;
      console.log(response.data);
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

  const handleFileSelect = (e) => {
    const files = e.target.files;
    const images = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith('image/')) {
        continue;
      }

      images.push(file);
    }

    setGallery(images);
    console.log(images);
  };


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
          <Button variant="contained" onClick={handleClickGOpen} className='project_button btn_edit'>Add More Photos<ChatIcon /></Button>
          <Button variant="contained" onClick={handleClickDOpen} className='project_button btn_edit'>Delete<ChatIcon /></Button>
      </Grid>
      
      {/* Add Photos Gallery */}
      <Dialog open={gopen} onClose={handleGClose}>
        <DialogTitle>Add More Photos</DialogTitle>
        <DialogContent>
          <Button variant="contained" component="label">
            Upload Project Photo  <AddPhotoAlternateIcon />
            <input hidden accept="image/*" multiple type="file" onChange={handleFileSelect} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGClose}>Cancel</Button>
          <Button onClick={inputgallery}>Upload</Button>
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