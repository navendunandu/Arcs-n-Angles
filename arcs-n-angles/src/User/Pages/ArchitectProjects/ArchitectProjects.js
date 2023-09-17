import React, { useEffect, useState } from 'react'
import { Tab, Tabs, Grid, Card, IconButton } from '@material-ui/core'
import './ArchitectProjects.css'
import resumeData from '../../utils/resumeData'
import { CardActionArea, CardContent, CardMedia, DialogActions, Grow, Typography, Dialog, DialogTitle, DialogContent, Button } from '@mui/material'
import ImageGallery from 'react-image-gallery';
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const ArchitectProjects = () => {
  const [tabValue, setTabValue] = useState("All");
  const [ProjectDialog, setProjectDialog] = useState(false)
  const [plan, setPlan] = useState([]);
  const aid= useParams();

  const fetcharchitectplan = () => {
    axios.get("http://localhost:4000/PlanArchitect/" + aid.aid ).then((response) => {
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
        <h6 className='section_title_text'>Architect Plan</h6>
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
                    <NavLink to={`/user/plandetails/${plan.project_id}`}>  
                      <CardActionArea>
                        <CardMedia className='customCard_image' image={plan.project_photo} title={plan.project_title} />
                        <CardContent>
                          <Typography className='customCard_title' variant={'body2'}>{plan.title}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </NavLink>
                    <CardContent>
                      <IconButton 
                      // onClick={() => handleLikeProjectClick(plan.project_id)}
                      //  color={liked ? "secondary" : "default"}
                       >
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton 
                      // onClick={()=>handleCommentProjectClick(plan.project_id)}
                      >
                        <ChatBubbleOutlineIcon />
                      </IconButton>
                      <Typography>5 likes</Typography>
                    </CardContent> 
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