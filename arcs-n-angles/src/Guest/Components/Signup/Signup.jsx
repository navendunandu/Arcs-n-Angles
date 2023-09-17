import React from 'react'
import './Signup.css'
import Vector1 from '../../img/Vector1.png';
import Vector2 from '../../img/Vector2.png';
import Engineer from '../../img/Engineer.png';
import { Route, Routes } from "react-router-dom";
import UserReg from './UserSignup';
import BuilderSignup from './BuilderSignup';
import ArchitectSignup from './ArchitectSignup';


const Signup = () => {
  return (
    <div className='reg-form'> 
        <div className="r-image">
              <img src={Vector1} alt='' />
              <img src={Vector2} alt='' />
              <img src={Engineer} alt='' />
              {/* blur divs */}
              <div className="reg-blur">

              </div>
              
        </div>
      
      <div className="r-right">
        <Routes>
          <Route path="/" element={<UserReg />} />
          <Route path="/BuilderReg" element={<BuilderSignup />} />
          <Route path="/ArchitectReg" element={<ArchitectSignup />} />
        </Routes>
      </div>
    </div>
  )
}

export default Signup