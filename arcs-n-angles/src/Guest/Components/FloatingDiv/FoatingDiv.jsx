import React from "react";
import './FloatingDiv.css';
const FloatingDiv = ({image}) => {
    return(
        <div className="floatingdiv">
            <img src={image} alt=""/>
        </div>
        
    )
}

export default FloatingDiv