import React from 'react'
import './Footer.css'
import resumeData from '../../utils/resumeData';
import { Typography } from '@material-ui/core'

const Footer = () => {
  return (
    <footer className='footer_user'>
      <div className='footer_left'>
        <Typography className="footer_name">{resumeData.name}</Typography>
      </div>
      <div className='footer_right'>
      <Typography className="footer_copyright">Arcsnangles@gmail.com</Typography>
      </div>
    </footer>
  )
}

export default Footer