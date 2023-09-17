import React, { useState } from 'react'
import { Tab, Tabs, Grid, Card } from '@material-ui/core'
import './ArchitectList.css'
import resumeData from '../../utils/resumeData'
import { CardActionArea, CardContent, CardMedia, DialogActions, Grow, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material'
import EngineeringIcon from '@mui/icons-material/Engineering';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';
import ImageGallery from 'react-image-gallery';
import axios from 'axios';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom'


const ArchitectList = () => {
  const [tabValue, setTabValue] = useState("All");
  const [ArchitectDialog, setArchitectDialog] = useState(false)

  const [archdata, setArchData] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:4000/ArchitectVerified").then((response) => {
      var data = response.data.ArchitectVerified;
      console.log(data);
      setArchData(data);
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
        <h6 className='section_title_text'>Architects</h6>
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
      {/* Architects */}
      <Grid item xs={12}>
        <Grid>
          {archdata.map((architect, key) => (
            <>
              {/* {tabValue == architect.tag || tabValue == 'All' ? ( */}
              <Grid item key={key} >
                <Grow in timeout={1000}>
                  <NavLink to={`/architect/architectprojects/${architect.architect_id}`} className="link">
                    <Card className='architectCard' onClick={() => setArchitectDialog(architect)}>
                      <CardActionArea>
                        {/* <CardMedia className='architectCard_image' image={architect.image} title={architect.name} /> */}
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <img className='architectCard_image' src={architect.architect_photo} alt={architect.architect_name} />
                            </Grid>
                            <Grid item xs={8}>
                              <Grid className='arch_details'><Typography varient="body2" className='architectCard_title'><EngineeringIcon className='arch_icons' /> {architect.architect_name}</Typography></Grid>
                              <Grid className='arch_details'><Typography varient="body2" className='architectCard_caption'><AssignmentIcon className='arch_icons' /> 5</Typography></Grid>
                              <Grid className='arch_details'><Typography varient="body2" className='architectCard_caption'><EmailIcon className='arch_icons' /> {architect.architect_email}</Typography></Grid>
                              <Grid className='arch_details'><Typography varient="body2" className='architectCard_caption'><PhoneIcon className='arch_icons' /> {architect.architect_contact}</Typography></Grid>
                              <Grid className='arch_details'><Typography varient="body2" className='architectCard_caption'><HomeIcon className='arch_icons' /> {architect.architect_address}</Typography></Grid>
                              <Grid className='arch_details'><Typography varient="body2" className='architectCard_caption'><PlaceIcon className='arch_icons' /> {architect.place_name}, {architect.district_name}</Typography></Grid>
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

export default ArchitectList