import React from "react";
import "./Login.css";
import Vector1 from "../../img/Vector1.png";
import Vector2 from "../../img/Vector2.png";
import axios from "axios";
import { useState } from "react";
import Engineer from "../../img/Engineer.png";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState([]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const isValidEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const loginData = () => {
    console.log(email);
    console.log(password);
    if (email === "") {
      setMsg("Please enter email");
      handleClick();
    } else if (password === "") {
      setMsg("Please enter password");
      handleClick();
    } else if (isValidEmail(email)) {
      var dat = {
        email: email,
        password: password,
      };
      axios.post("http://localhost:4000/login", dat).then((response) => {
        setMsg(response.data.message);
        if (response.data.login == "admin") {
          sessionStorage.setItem("aid", response.data.id);
          navigate("/Admin/");
        } else if (response.data.login == "user") {
          sessionStorage.setItem("uid", response.data.id);
          navigate("/User/");
        } else if (response.data.login == "builder") {
          sessionStorage.setItem("bid", response.data.id);
          navigate("/builder/");
        } else if (response.data.login == "architect") {
          sessionStorage.setItem("arid", response.data.id);
          navigate("/architect/");
        }
      });
    } else {
      setMsg("Please enter a valid email address.");
      handleClick();
    }
  };

  return (
    <div className="login-form">
      <div className="l-image">
        <img src={Vector1} alt="" />
        <img src={Vector2} alt="" />
        <img src={Engineer} alt="" />
        {/* blur divs */}
        <div className="blur"></div>
      </div>

      <div className="l-right">
        <form action="">
          <span className="l-title">Sign In</span>
          <span className="l-sub">To Continue</span>
          <input
            type="email"
            name="user_email"
            className="user"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="user"
            name="user_password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="button"
            className="button"
            value="Log In"
            onClick={loginData}
          />
          <div
            className="blur l-blur"
            style={{ background: "var(--purpule)" }}
          ></div>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
