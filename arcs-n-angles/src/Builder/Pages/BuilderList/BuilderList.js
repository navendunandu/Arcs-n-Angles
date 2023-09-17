import React, { useState } from 'react'
import { Tab, Tabs, Grid, Card } from '@material-ui/core'
import './BuilderList.css'
import resumeData from '../../utils/resumeData'
import { CardActionArea, CardContent, CardMedia, DialogActions, Grow, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material'
import ImageGallery from 'react-image-gallery';
import axios from 'axios';
import { useEffect } from 'react';
import FoundationIcon from '@mui/icons-material/Foundation';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';
import { NavLink } from 'react-router-dom'


const BuilderList = () => {
  const [tabValue, setTabValue] = useState("All");
  const [builderDialog, setbuilderDialog] = useState(false)

  const [builderdata, setBuilderData] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:4000/BuilderVerified").then((response) => {
      var data = response.data.BuilderVerified;
      console.log(data);
      setBuilderData(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={1} className='section pb_20 pt_20'>
      {/* Title */}
      <Grid item className='section_title mb_20'>
        <span></span>
        <h6 className='section_title_text'>Builder</h6>
      </Grid>

      {/* Tabs */}
      {/* <Grid item xs={12}>
        <Tabs value={tabValue} indicatorColor='white'
          className='customTabs'
          onChange={(event, newValue) => setTabValue(newValue)}>
          <Tab label='All' value='All' className={tabValue == 'All' ? 'customTabs_item active' : 'customTabs_item'} />
          {[...new Set(resumeData.projects.map(item => item.tag))].map(tag => (
            <Tab label={tag} value={tag} className={tabValue == tag ? 'customTabs_item active' : 'customTabs_item'} />
          ))}
        </Tabs>
      </Grid> */}
      {/* builders */}
      <Grid item xs={12}>
        <Grid>
          {builderdata.map((builder) => (
            <>
              {/* {tabValue == builder.tag || tabValue == 'All' ? ( */}
              <Grid item  >
                <Grow in timeout={1000}>
                  <NavLink to={`/builder/builderproject/${builder.builder_id}`} className="link">
                    <Card className='builderCard' onClick={() => setbuilderDialog(builder)}>
                      <CardActionArea>
                        {/* <CardMedia className='builderCard_image' image={builder.image} title={builder.name} /> */}
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <img className='builderCard_image' src={builder.builder_photo} alt='name' />
                            </Grid>
                            <Grid item xs={8}>
                              <Grid className='builder_details'><Typography className='builderCard_title' variant={'body2'}><FoundationIcon className='builder_icons' /> {builder.builder_name}</Typography></Grid>
                              <Grid className='builder_details'><Typography varient="body2" className='builderCard_caption'><AssignmentIcon className='builder_icons' /> 5</Typography></Grid>
                              <Grid className='builder_details'><Typography varient="body2" className='builderCard_caption'><EmailIcon className='builder_icons' /> {builder.builder_email}</Typography></Grid>
                              <Grid className='builder_details'><Typography varient="body2" className='builderCard_caption'><PhoneIcon className='builder_icons' /> {builder.builder_contact}</Typography></Grid>
                              <Grid className='builder_details'><Typography varient="body2" className='builderCard_caption'><HomeIcon className='builder_icons' /> {builder.builder_address}</Typography></Grid>
                              <Grid className='builder_details'><Typography varient="body2" className='builderCard_caption'><PlaceIcon className='builder_icons' /> {builder.place_name}, {builder.district_name}</Typography></Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </NavLink>
                </Grow>
              </Grid>
              {/* ) : null} */}
            </>
          ))}
        </Grid>
      </Grid>

      {/* <Dialog open={Boolean(ProjectDialog)} onClose={() => setProjectDialog(false)}
        className="projectDialog" maxWidth={'lg'} fullWidth>
        <DialogTitle onClose={() => setProjectDialog(false)}>
          {ProjectDialog.title}
        </DialogTitle>
        <img src={ProjectDialog.image} className='projectDialog_image' />
        <DialogContent className='projectDialog_content'>
          {ProjectDialog.images && (
            <ImageGallery images={ProjectDialog.images} />
          )}
          <Typography className='projectDialog_description'>
            {ProjectDialog.description}
          </Typography>
        </DialogContent>
        <DialogActions className='projectDialog_action'>
          {ProjectDialog?.links?.map(link => (
            <a href={link.link} target='_blank' rel="noopener noreferrer" className='projectDialog_icon'>
              {link.icon}</a>
          ))}
        </DialogActions>
      </Dialog> */}

    </Grid>
  )
}

export default BuilderList