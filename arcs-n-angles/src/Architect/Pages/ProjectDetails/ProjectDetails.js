import { Button, ButtonBase, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './ProjectDetails.css'
import { styled } from '@mui/material/styles';
import CategoryIcon from '@mui/icons-material/Category';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FoundationIcon from '@mui/icons-material/Foundation';
import ChatIcon from '@mui/icons-material/Chat';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {

  const { prid } = useParams();
  const [projectphoto, setProjectphoto] = useState([]);
  const [projectdetail, setProjectdetail] = useState([]);
  const [mainphoto, setMainphoto] = useState([]);

  const fetchProjectData = () => {
    axios.get(`http://localhost:4000/ProjectGallery/${prid}`).then((response) => {
      var data = response.data.Gallery;
      console.log(data);
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
        <NavLink to={`/architect/chatboxbuilder/${projectdetail.builder_id}`}>
          <Button variant="contained" className='project_button btn_edit'>Know More<ChatIcon /></Button>
        </NavLink>
      </Grid>
    </Grid>

  )
}

export default ProjectDetails