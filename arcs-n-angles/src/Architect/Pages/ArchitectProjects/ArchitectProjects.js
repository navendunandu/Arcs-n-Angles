import React, { useEffect, useState } from 'react'
import { Tab, Tabs, Grid, Card, IconButton } from '@material-ui/core'
import './ArchitectProjects.css'
import resumeData from '../../utils/resumeData'
import { CardActionArea, CardContent, CardMedia, DialogActions, Grow, Typography, Dialog, DialogTitle, DialogContent, Button } from '@mui/material'
import ImageGallery from 'react-image-gallery';
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const ArchitectProjects = () => {
  const [tabValue, setTabValue] = useState("All");
  const [ProjectDialog, setProjectDialog] = useState(false)
  const [plan, setPlan] = useState([]);

  const fetcharchitectplan = () => {
    axios.get("http://localhost:4000/PlanArchitect/" + sessionStorage.getItem('arid')).then((response) => {
      var data = response.data.PlanArchitect;
      console.log(data);
      setPlan(data);
    });
  }

  useEffect(() => {
    fetcharchitectplan();
  }, []);

  return (
    <Grid container spacing={1} className='section pb_20 pt_20'>
      {/* Title */}
      <Grid item className='section_title archbar'>
        <h6 className='section_title_text'>My Projects</h6>
        <NavLink to="newproject" className="sidebar_link button_container">
          <Button className='arch_new_button'>Add New Project</Button>
        </NavLink>
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
      {/* Projects */}
      <Grid item xs={12}>
        <Grid>
          {plan.map((plan) => (
            <>
              {/* {tabValue == project.tag || tabValue == 'All' ? ( */}
              <Grid item  >
                <Grow in timeout={1000}>
                  <Card className='customCard'>
                    <NavLink to={`/architect/plandetails/${plan.project_id}`}>
                      <CardActionArea>
                        <CardMedia className='customCard_image' image={plan.project_photo} title={plan.project_title} />
                        <CardContent>
                          <Typography className='customCard_title' variant={'body2'}>{plan.project_title}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </NavLink>
                  </Card>
                </Grow>
              </Grid>
              {/* ) : null} */}
            </>
          ))}
        </Grid>
      </Grid>

    </Grid>
  )
}

export default ArchitectProjects