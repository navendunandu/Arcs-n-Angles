import Navbar from "./Components/Navbar/Navbar";
import Intro from "./Components/Intro/Intro";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Footer from "./Components/Footer/Footer";

// import { useContext } from "react";
// import { themeContext } from "./Context";

function App() {
  // const theme = useContext(themeContext);
  // const darkMode = theme.state.darkMode;
  return (
    <div
      className="App"
      style={{}}
      // style={{
      //   background: darkMode ? "black" : "",
      //   color: darkMode ? "white" : "",
      // }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Intro />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup//*" element={<Signup />}>

        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
