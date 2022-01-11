import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";


const Navigation = ({userObj}) => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li><Link to ="/"> <FontAwesomeIcon icon={faTwitter} /></Link></li>
        <li><Link to ="/profile">{userObj.displayName}님 Profile</Link></li>
      </ul>
    </nav>
  )
} 

export default Navigation;