import React, { useState } from 'react'
import { Tab, Tabs, Grid, Card } from '@material-ui/core'
import './BuilderList.css'
import resumeData from '../../utils/resumeData'
import { CardActionArea, CardContent, CardMedia, DialogActions, Grow, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material'
import ImageGallery from 'react-image-gallery';


const BuilderList = () => {
  const [tabValue, setTabValue] = useState("All");
  const [builderDialog, setbuilderDialog] = useState(false)

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
        <Grid container spacing={3}>
          {resumeData.builders.map((builder) => (
            <>
              {tabValue == builder.tag || tabValue == 'All' ? (
                <Grid item  >
                  <Grow in timeout={1000}>
                    <Card className='builderCard' onClick={() => setbuilderDialog(builder)}>
                      <CardActionArea>
                        {/* <CardMedia className='builderCard_image' image={builder.image} title={builder.name} /> */}
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <img className='builderCard_image' src='https://wallpapers.com/images/featured/87h46gcobjl5e4xu.jpg' alt='name' />
                            </Grid>
                            <Grid item xs={8}>
                              <Typography className='builderCard_title' variant={'body2'}>Name: {builder.name}</Typography>
                              <Typography varient="body2" className='builderCard_caption'>No of Projects: {builder.projects}</Typography>
                              <Typography varient="body2" className='builderCard_caption'>Email: {builder.mail}</Typography>
                              <Typography varient="body2" className='builderCard_caption'>Contact: {builder.contact}</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grow>
                </Grid>
              ) : null}
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