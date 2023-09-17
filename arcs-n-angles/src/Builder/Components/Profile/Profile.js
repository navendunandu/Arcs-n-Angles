import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Profile.css';
import CustomTimeline, { CustomTimelineSeparator } from '../Timeline/Timeline'
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineItem from '@material-ui/lab/TimelineItem';
import { CustomNavButton } from '../Button/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { NavLink, useNavigate } from "react-router-dom";
import EngineeringIcon from '@mui/icons-material/Engineering';
import FoundationIcon from '@mui/icons-material/Foundation';
import axios from 'axios';
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

  const [archdata, setArchData] = useState([]);

  const fetchData = () => {
    var id = sessionStorage.getItem("bid");
    console.log(id);
    axios.get("http://localhost:4000/BuilderCond/" + id).then((response) => {
      var data = response.data.Builder[0];
      console.log(data);
      setArchData(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='profile container_shadow sticky-top'>
      <div className='profile_name'>
        <Typography className='name'>{archdata.builder_name}</Typography>
        <Typography className='title'>Builder</Typography>
      </div>

      <figure className='profile_image'>
        <img src={archdata.builder_photo} alt={archdata.builder_name} style={{ height: "" }} />
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
          <NavLink to="myprojects" className="sidebar_link button_container">
            <CustomNavButton text={"My Projects"} icon={<AssignmentIcon />} />
          </NavLink>
        </div>

        <div className='button_container'>
          <NavLink to="chatlist" className="sidebar_link button_container">
            <CustomNavButton text={"Messages"} icon={<MessageIcon />} />
          </NavLink>
        </div>

        <div className='button_container'>
          <NavLink to="purchases" className="sidebar_link button_container">
            <CustomNavButton text={"My Purchase"} icon={<InventoryIcon />} />
          </NavLink>
        </div>
      </div>

    </div>
  )
}

export default Profile