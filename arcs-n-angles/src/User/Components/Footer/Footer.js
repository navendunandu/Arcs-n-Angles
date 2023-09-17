import React from 'react'
import './Footer.css'
import resumeData from '../../utils/resumeData';
import { Typography } from '@material-ui/core'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Footer = () => {

  const [userdata, setUserData] = useState([]);

  const fetchData = () => {
    var id = sessionStorage.getItem("uid");
    console.log("id");
    console.log(id);
    axios.get("http://localhost:4000/UserCond/"+id).then((response) => {
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
    <footer className='footer_user'>
      <div className='footer_left'>
        <Typography className="footer_name">{userdata.user_name}</Typography>
      </div>
      <div className='footer_right'>
      <Typography className="footer_copyright">{userdata.user_email}</Typography>
      </div>
    </footer>
  )
}

export default Footer