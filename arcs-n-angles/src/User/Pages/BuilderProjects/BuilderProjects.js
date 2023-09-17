import React, { useEffect, useState } from 'react'
import { Tab, Tabs, Grid, Card } from '@material-ui/core'
import './BuilderProjects.css'
import { CardActionArea, CardContent, CardMedia, DialogActions, Grow, Typography, Dialog, DialogTitle, DialogContent, Button } from '@mui/material'
import ImageGallery from 'react-image-gallery';
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios';

const BuilderProjects = () => {
  const [tabValue, setTabValue] = useState("All");
  const [ProjectDialog, setProjectDialog] = useState(false)
  const [projectdata, setProjectData] = useState([]);
  const {bid} = useParams();

const fetchProjectData = () => {
  axios.get("http://localhost:4000/ProjectBuilder/" + bid).then((response) => {
    var data = response.data.BuilderProject;
    console.log(response);
    setProjectData(data);
  });
};

useEffect(() => {
  fetchProjectData();
}, []);

  return (
    <Grid container spacing={1} className='section pb_20 pt_20'>
      {/* Title */}
      <Grid item className='section_title archbar'>
        <h6 className='section_title_text'>Builder Projects</h6>
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
          {projectdata.map((project) => (
            <>
              {/* {tabValue == project.tag || tabValue == 'All' ? ( */}
              <Grid item  >
                <Grow in timeout={1000}>
                  <Card className='customCard'>
                    <NavLink to={`/user/projectdetails/${project.project_id}`} className="link">
                      <CardActionArea>
                        <CardMedia className='customCard_image' image={project.project_photo} title={project.project_title} />
                        <CardContent>
                          <Typography className='customCard_title' variant={'body2'}>{project.project_title}</Typography>
                          <Typography variant="body2" className='customCard_caption'>{project.caption}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </NavLink>
                    {/* <CardContent>
                      <IconButton onClick={() => handleLikeProjectClick(project.project_id)} color={liked ? "secondary" : "default"}>
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleCommentProjectClick(project.project_id)}>
                        <ChatBubbleOutlineIcon />
                      </IconButton>
                      <Typography>5 likes</Typography>
                    </CardContent> */}
                  </Card>
                </Grow>
              </Grid>
              {/* ) : null} */}
            </>
          ))}

        </Grid>
      </Grid>

      {/* Image Box */}

      <Dialog open={Boolean(ProjectDialog)} onClose={() => setProjectDialog(false)}
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
      </Dialog>

    </Grid>
  )
}

export default BuilderProjects