import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css'
// import Toggle from "../Toggle/Toggle";

const Navbar = () => {
    const [pathName, setPathame]=useState('/login');
    const [name, setName]=useState('Login');

    const pathchange = () =>{
        if(pathName=='/login'){
            setPathame('/signup')
            setName('Sign Up')
        }
        else{
            setPathame('/login')
            setName('Log In')
        }
    }
  return (
    <div className="n-wrapper">
        <div className="n-left">
            <div className="n-name"><a href='/' className='homelink'><span className='arch'>Arcs</span><span className='arena'>&</span><span className='arch'>Angles</span></a></div>
            {/* <Toggle/> */}
        </div>
        <div className="n-right">
            <div className="n-list">
                {/* <ul style={{listStyleType: 'none'}}>
                    <li>Home</li>
                </ul> */}
            </div>
                <NavLink to={pathName} onClick={pathchange}><button className="button n-button">
                    {name}
                </button>
            </NavLink>
        </div>
    </div>
  )
}

export default Navbar