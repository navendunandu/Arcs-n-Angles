import React from 'react'
import './Footer.css'
import Wave from "../../img/wave.png";

import Insta from '@iconscout/react-unicons/icons/uil-instagram'
import Facebook from '@iconscout/react-unicons/icons/uil-facebook'
import Linkedin from '@iconscout/react-unicons/icons/uil-linkedin'

const Footer = () => {
  return (
    <div class='footer'>
        <img src={Wave} alt="" style={{ width: "100%", height:"300px" }} />
        <div className="f-content">
            <span>ArchArena@gmail.com</span>
            <div className="f-icons">
                <Insta color='white' size='3rem' />
                <Facebook color='white' size='3rem' />
                <Linkedin color='white' size='3rem' />
            </div>
        </div>
    </div>
  )
}

export default Footer