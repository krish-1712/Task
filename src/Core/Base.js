import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

 export const  Appcontext= createContext()

const Base = ({ title,children }) => {
    const history = useNavigate();
  return (
    <div>
    <div>
        <div className="nav-styles">
            <span>
                <button
                    className="nav-buttons"
                    onClick={() => history("/create")}
                > Add Details</button>
            </span>
          
            <span>
                <button
                    className="nav-buttons"
                    onClick={() => history("/delete")}
                > All Details</button>
            </span>

        </div>
        <div className="title">{title}</div>
    </div>
    <div className="childred">
      
            {children}
           
    </div>

</div>
  )
}

export default Base