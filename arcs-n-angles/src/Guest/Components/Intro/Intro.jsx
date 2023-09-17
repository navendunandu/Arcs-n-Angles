import React from "react";
import './Intro.css';
import FloatingDiv from "../FloatingDiv/FoatingDiv";
import Vector1 from '../../img/Vector1.png';
import Vector2 from '../../img/Vector2.png';
import Engineer from '../../img/Engineer.png';
import Undercons from '../../img/Undercons.png';
import thumbup from '../../img/thumbup.png';
import glassesimoji from '../../img/glassesimoji.png';
import { motion } from "framer-motion";
import { Link } from "react-scroll";


const Intro = () => {
    // Transition
    const transition = { duration: 2, type: "spring" };

    return(
    <div className="intro">
        <div className="i-left">
            <div className="i-name">
                <span>Welcome to</span>
                <div className="i-title">
                    <span>Arcs</span><span className="black_and">&</span><span>Angles</span>
                </div>
                <span>
                    An Arena to share your works and ideas to others
                </span>
            </div>
            <a href="/Signup" className="button_link"><button className="button i-button">Get Started</button></a>
        </div>
        <div className="i-right">
            <img src={Vector1} alt='' />
            <img src={Vector2} alt='' />
            <img src={Engineer} alt='' />

   

            <motion.img
          initial={{ left: "-56%" }}
          whileInView={{ left: "-24%" }}
          transition={transition}
          src={glassesimoji}
          alt=""
        />
            <motion.div
                initial={{ top: "-4%", left: "74%" }}
                whileInView={{ left: "52%" }}
                transition={transition}
                className="floating-div"
                >
                <FloatingDiv image={Undercons} />
            </motion.div>
            <motion.div
                initial={{ left: "6rem", top: "28rem" }}
                whileInView={{ left: "0rem" }}
                transition={transition}
                className="floating-div"
                >
                <FloatingDiv image={thumbup} />
            </motion.div>
            {/* blur divs */}
            <div className="blur">

            </div>
            <div className="blur" style={{background: "#C1F5FF", top: '17rem', width: '21rem', height: '11rem'}}>

            </div>
        </div>
    </div>
    )
}

export default Intro