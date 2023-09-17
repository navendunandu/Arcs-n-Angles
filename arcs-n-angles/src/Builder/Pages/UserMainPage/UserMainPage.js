import React, { useState } from 'react'
import { Tab, Tabs, Grid, Card, IconButton, TextField, ListItemText, ListItem, List, Button } from '@material-ui/core'
import './UserMainPage.css'
import { CardActionArea, CardContent, CardMedia, DialogActions, Grow, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material'
import ImageGallery from 'react-image-gallery';
import axios from 'axios'
import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const UserMainPage = () => {
  const [tabValue, setTabValue] = useState("All");
  const [ProjectDialog, setProjectDialog] = useState(false)

  const [projectdata, setProjectData] = useState([]);
  const [cmt, setCmt] = useState(['']);
  const [cmnt, setCmnt] = useState([]);

  const fetchProjectData = () => {
    axios.get("http://localhost:4000/Projectbuildermain/" + sessionStorage.getItem('bid')).then((response) => {
      var data = response.data;
      setProjectData(data);
      console.log(data);
    })
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  const handleLikeProjectClick = (e) => {
    axios.get("http://localhost:4000/likecheckbuilder/" + sessionStorage.getItem('bid') + "&" + e).then((response) => {
      fetchProjectData();
    })
  }

  const [openComments, setOpenComments] = useState(false);
  const [projectid, setProjectid] = useState([]);

  const fetchProjectcomment = () => {
    var pid = projectid;

  }

  const handleCommentProjectClick = (pr) => {
    setProjectid(pr);
    axios.get("http://localhost:4000/usercommentproject/" + pr).then((response) => {
      var data = response.data.Comment;
      setCmnt(data);
    })
    setOpenComments(true);
  }

  const handleCommentClose = () => {
    setOpenComments(false);
  }

  const handleUserCommentSubmit = (e) => {
    var dat = {
      builderid: sessionStorage.getItem('bid'),
      projectid: e,
      comment: cmt,
    };
    axios.post("http://localhost:4000/buildercommentproject/", dat).then((response) => {
      alert(response.data.message);
      fetchProjectcomment(e);
    });
  }

  return (
    <Grid container spacing={1} className='section pb_20 pt_20'>
      {/* Title */}
      <Grid item className='section_title mb_20'>
        <span></span>
        <h6 className='section_title_text'>What's New!!</h6>
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
          {projectdata.map((project, key) => (
            <>

              {/* {tabValue == project.tag || tabValue == 'All' ? ( */}
              <Grid item key={key} >
                <Grow in timeout={1000}>
                  <Card className='customCard'>
                    <NavLink
                      to={(project.project_type == 'project') ? (`projectdetails/${project.project_id}`) : (`plandetails/${project.project_id}`)}
                      className="link"
                    >
                      <CardActionArea>
                        <CardMedia className='customCard_image' image={project.project_photo} title={project.project_title} />
                        <CardContent>
                          <Typography className='customCard_title' variant={'body2'}>{project.project_title}</Typography>
                          <Typography variant="body2" className='customCard_caption'>{project.caption}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </NavLink>
                    <CardContent>
                      <IconButton onClick={() => handleLikeProjectClick(project.project_id)} >
                        {project.check ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                      </IconButton>
                      <IconButton onClick={() => handleCommentProjectClick(project.project_id)}>
                        <ChatBubbleOutlineIcon />
                      </IconButton>
                      <Typography>{project.count} likes</Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
              {/* ) : null} */}
            </>
          ))}
        </Grid>
      </Grid>

      <Dialog open={openComments} onClose={handleCommentClose}>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <List>
            {cmnt.map((comment, key) => (
              <ListItem key={key}>
                <ListItemText primary={comment.feedback_review} />
              </ListItem>
            ))}
          </List>
          <TextField
            placeholder="Add a comment"
            variant="outlined"
            onChange={(cm) => setCmt(cm.target.value)}
            margin="normal"
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={() => handleUserCommentSubmit({ projectid })}>
            Post
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(ProjectDialog)} onClose={() => setProjectDialog(false)}
        className="projectDialog" maxWidth={'lg'} fullWidth>
        <DialogTitle onClose={() => setProjectDialog(false)}>
          {ProjectDialog.title}
        </DialogTitle>
        <img src={ProjectDialog.image} className='projectDialog_image' alt='Project Photo' />
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

export default UserMainPage