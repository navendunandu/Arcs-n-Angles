import React from 'react'
import { Button } from "@material-ui/core"
import "./Button.css"

const CustomButton = ({ text, icon }) => {
  return (
    <Button className="custom_btn"
      endIcon={icon ? <div className="btn_icon_container">{icon}</div> : null}>
      <span className='btn_text'>{text}</span>
    </Button>
  )
}

const CustomNavButton = ({ text, icon }) => {
  return (
    <Button className="custom_navbtn"><div className="navbtn_icon_container">{icon}</div>
      <span className='navbtn_text'>{text}</span>
    </Button>
  )
}

export { CustomNavButton, CustomButton }