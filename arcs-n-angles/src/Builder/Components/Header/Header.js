import React from 'react'
import './Header.css'
import { Button, form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, NavLink} from "react-router-dom";
import {HomeRounded, SchoolRounded, WorkRounded, Facebook, Twitter, LinkedIn} from "@material-ui/icons";
import resumeData from '../../utils/resumeData';
import {CustomButton} from '../Button/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = (props) => {

  const pathName = props?.location?.pathName;

  return (
    <Navbar expand="lg" sticky='top' className='header'>
        {/* Homelink */}
        <Nav.Link as={NavLink} to="/builder">
          <Navbar.Brand className='header_home'>
            <HomeRounded />
          </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle/>
        <Navbar.Collapse className='navbar_user'>
          <Nav className='header_right'>
            {/* Profile link */}
            <Nav.Link as={NavLink} to="/user" className="header_link">
            <span className='arch'>Arcs</span><span className='arena'>&</span><span className='arch'>Angles</span>
            </Nav.Link>
          </Nav>

          <div className='header-right'>
          <Nav.Link as={NavLink} to="/">
            <CustomButton text={'Log Out'} icon={<LogoutIcon/>} />
          </Nav.Link> 
          </div>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;