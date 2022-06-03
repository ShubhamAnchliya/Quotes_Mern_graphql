

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";
import { FaBars, FaTimes} from "react-icons/fa";


import { BsChatSquareQuoteFill } from "react-icons/bs";
const NavBar = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const Close = () => setClick(false);

    const token = localStorage.getItem("token")
    
    const logOut = () => {
      localStorage.removeItem("token")
      console.log("logout");
     
    } 

  return (
    <>
 
        <div className={click ? "main-container" : ""}  onClick={()=>Close()} />  
        <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container ">

          <Link to="/" className="nav-logo">
            QuoteSome
            <i className='emoji'><BsChatSquareQuoteFill/></i>
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>


            {
              token ? 
              <>
                <li className="nav-item">
                  <Link
                    to="/"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                  
                    to="/profile"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Profile
                  </Link>
                </li>
            
                <li className="nav-item">
                  <Link
                  
                    to="/createquote"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    CreateQuote
                  </Link>
                </li>


                <li className="nav-item">
                  <Link
                  
                    to="/login"
                    activeclassname="active"
                    className="nav-links"

                    onClick={logOut}
                  >
                    LogOut
                  </Link>

                
                </li>

              </>:
              <>

                <li className="nav-item">
                  <Link
                  
                    to="/login"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                  LogIn
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                  
                    to="/signup"
                    activeclassname="active"
                    className="nav-links"
                  onClick={click ? handleClick : null}
                  >
                  SignUp
                  </Link>
                </li>
              </>

            }

      
          </ul>

          <div className="nav-icon" onClick={handleClick}>
           
            {  
              click ? <FaTimes/>:<FaBars/>
            }         
          </div>

        </div>
      </nav> 
    </>
  )
}

export default NavBar;