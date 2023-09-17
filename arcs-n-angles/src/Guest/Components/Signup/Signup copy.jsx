import React from 'react'
import './Signup.css'
import Vector1 from '../../img/Vector1.png';
import Vector2 from '../../img/Vector2.png';
import Engineer from '../../img/Engineer.png';

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
        <form action="">
        
        <span className='r-sub'>Create an Account</span>
        <div className="name align-form">
          <input type="text" name="user_fname" className="reg-user" placeholder='First Name' required />
          <input type="text" name="user_lname" className="reg-user" placeholder='Last Name' required/>
        </div>
        <div className="contact align-form">
          <input type="email" name="user_email" className="reg-user" placeholder='Email' required/>
          <input type="text" name="user_num" className="reg-user" placeholder='Mobile Number' required/>
        </div>
          <div className="loc align-form">
          <select className='reg-user place'>
            <option className='reg-user'>Select District</option>
          </select>
          <select className='reg-user place'>
            <option className='reg-user'>Select Place</option>
          </select>
        </div>
        <div className="others">
          <textarea className="reg-user reg-add" name="postContent" placeholder='Address' />
          <div className="gender">
            <h4 className='genname'>Gender</h4>
            <div className="gen-btn">
              <label>Male</label>
              <input type="radio" name="user_rad" value="Male" required/>
              <label>Female</label>
              <input type="radio" name="user_rad"  value="Female" required/>
              <label>Others</label>
              <input type="radio" name="user_rad"  value="Other" required/>
            </div>
          </div>
        </div>
        <div className="pass align-form">
          <input type="password" className="reg-user" name="user_password" placeholder='Password' required/>
          <input type="password" className="reg-user" name="user_cpassword" placeholder='Confirm Password' required/>
        </div>
          <input type="submit" className="button" value="Create" />
          <div className="reg-blur r-blur" style={{background:"var(--purpule)"}}>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup