import { Typography } from '@material-ui/core'
import React from 'react'
import './Profile.css';
import CustomTimeline, { CustomTimelineSeparator } from '../Timeline/Timeline'
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineItem from '@material-ui/lab/TimelineItem';
import { CustomNavButton } from '../Button/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { NavLink, useNavigate } from "react-router-dom";
import EngineeringIcon from '@mui/icons-material/Engineering';
import FoundationIcon from '@mui/icons-material/Foundation';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';

const CustomTimelineItem = ({ title, text, link }) => (
  <TimelineItem>
    <CustomTimelineSeparator />
    <TimelineContent className='timeline_content'>

      {link ? (<Typography className='timelineItem_text'>
        <span>{title}:</span> <a href={link} target='_blank'>{text}</a>
      </Typography>) : (
        <Typography className='timelineItem_text'>
          <span>{title}:</span>
          {text}
        </Typography>
      )}
    </TimelineContent>
  </TimelineItem>
);

const Profile = () => {

  const [userdata, setUserData] = useState([]);

  const fetchData = () => {
    var id = sessionStorage.getItem("uid");
    console.log("id");
    console.log(id);
    axios.get("http://localhost:4000/UserCond/" + id).then((response) => {
      var data = response.data.User;
      console.log(data);
      setUserData(data[0]);
      console.log(userdata.user_name);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='profile container_shadow sticky-top'>
      <div className='profile_name'>
        <Typography className='name'>{userdata.user_name}</Typography>
      </div>

      <figure className='profile_image'>
        <img src={userdata.user_photo} alt={userdata.user_name} />
      </figure>

      <div className='profile_information'>

        <div className='button_container'>
          <NavLink to="myprofile" className="sidebar_link button_container">
            <CustomNavButton text={"My Profile"} icon={<AccountCircleIcon />} />
          </NavLink>
        </div>

        <div className='button_container'>
          <NavLink to="architectlist" className="sidebar_link button_container">
            <CustomNavButton text={"Architects"} icon={<EngineeringIcon />} />
          </NavLink>
        </div>

        <div className='button_container'>
          <NavLink to="builderlist" className="sidebar_link button_container">
            <CustomNavButton text={"Builders"} icon={<FoundationIcon />} />
          </NavLink>
        </div>

        <div className='button_container'>
        <NavLink to="chatlist" className="sidebar_link button_container">
          <CustomNavButton text={"Messages"} icon={<MessageIcon />} />
          </NavLink>
        </div>

        <div className='button_container'>
          <NavLink to="purchases" className="sidebar_link button_container">
            <CustomNavButton text={"Purchases"} icon={<InventoryIcon />} />
          </NavLink>
        </div>
      </div>

    </div>
  )
}

export default Profile