import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Signup.css";
import FoundationIcon from "@mui/icons-material/Foundation";

const BuilderSignup = () => {
  const navigate = useNavigate();

  const [seldist, setSeldist] = useState([]);
  const [fname, setFname] = useState([]);
  const [lname, setLname] = useState([]);
  const [email, setEmail] = useState([]);
  const [number, setNumber] = useState([]);
  const [address, setAddress] = useState([]);
  const [selplace, setSelplace] = useState([]);
  const [selplaces, setSelplaces] = useState([]);
  const [gender, setGender] = useState([]);
  const [file, setFile] = useState([]);
  const [pfile, setPFile] = useState([]);
  const [password, setPassword] = useState([]);

  const fetchDistrict = () => {
    axios.get("http://localhost:4000/District").then((response) => {
      var data = response.data.district;
      setSeldist(data);
    });
  };

  let formData = new FormData();

  const inputData = (e) => {
    console.log("hi" + file);
    formData.append("builder_name", fname + " " + lname);
    formData.append("builder_email", email);
    formData.append("builder_contact", number);
    formData.append("builder_address", address);
    formData.append("place_id", selplaces);
    formData.append("builder_photo", file);
    formData.append("builder_proof", pfile);
    formData.append("builder_gender", gender);
    formData.append("builder_password", password);
    console.log(file);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post("http://localhost:4000/BuilderReg", formData, config)
      .then((response) => {
        alert(response.data.message);
        navigate("/login");
      });
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

  const ajaxPlace = (did) => {
    axios
      .get(`http://localhost:4000/Place_Condition/${did}`)
      .then((response) => {
        var data = response.data.Place;

        setSelplace(data);
      });
  };

  return (
    <div className="form mtt_30">
      <div className="r-header">
        <a href="/signup">
          <button className="button n-button">User Sign Up</button>
        </a>
        <NavLink to="/signup/ArchitectReg">
          <button className="button new-reg-btn">Architect Sign Up</button>
        </NavLink>
      </div>
      <div className="r-title title-bar mtt_25">
        <span>
          <FoundationIcon className="title-icon" />
        </span>
        <span className="r-sub">Create Builder Account</span>
      </div>
      <div className="reg-btn"></div>
      <div className="name align-form">
        <input
          type="text"
          name="user_fname"
          className="reg-user"
          placeholder="First Name"
          required
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          type="text"
          name="user_lname"
          className="reg-user"
          placeholder="Last Name"
          required
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div className="contact align-form">
        <input
          type="email"
          name="user_email"
          className="reg-user"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="user_num"
          className="reg-user"
          placeholder="Mobile Number"
          required
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div className="loc align-form">
        <select
          className="reg-user place"
          defaultValue=""
          onChange={(e) => {
            ajaxPlace(e.target.value);
          }}
        >
          <option className="reg-user" value="">
            Select District
          </option>
          {seldist.map((d, key) => (
            <option className="reg-user" key={key} value={d.district_id}>
              {d.district_name}
            </option>
          ))}
        </select>
        <select
          className="reg-user place"
          defaultValue=""
          onChange={(e) => setSelplaces(e.target.value)}
        >
          <option className="reg-user" value="">
            Select Place
          </option>
          {selplace.map((p, key) => {
            return (
              <option className="reg-user" key={key} value={p.place_id}>
                {p.place_name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="others">
        <textarea
          className="reg-user reg-add"
          name="postContent"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="gender">
          <h4 className="genname">Gender</h4>
          <div className="gen-btn">
            <label>Male</label>
            <input
              type="radio"
              name="user_rad"
              value="Male"
              required
              onChange={(e) => setGender(e.target.value)}
            />
            <label>Female</label>
            <input
              type="radio"
              name="user_rad"
              value="Female"
              required
              onChange={(e) => setGender(e.target.value)}
            />
            <label>Others</label>
            <input
              type="radio"
              name="user_rad"
              value="Other"
              required
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="file-upload">
        <div className="pass file">
          <h5 className="upload-head">User Picture:</h5>
          <input
            type="file"
            name="pro_pic"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="pass file">
          <h5 className="upload-head">Proof:</h5>
          <input
            type="file"
            name="pro_pic"
            required
            onChange={(e) => setPFile(e.target.files[0])}
          />
        </div>
      </div>
      <div className="pass align-form">
        <input
          type="password"
          className="reg-user"
          name="user_password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <input
          type="password"
          className="reg-user"
          name="user_cpassword"
          placeholder="Confirm Password"
          required
        /> */}
      </div>
      <input
        type="submit"
        className="button"
        value="Create"
        onClick={inputData}
      />
    </div>
  );
};

export default BuilderSignup;
