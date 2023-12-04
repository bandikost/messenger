import React, {useState, useContext} from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import email from "../images/email.png"
import info from "../images/info.png"
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

// <img src={currentUser?.photoURL} alt="" />

const Settings = () => {
  const [user, setUser] = useState(null);
  const {currentUser} = useContext(AuthContext)
  const chatUser = useState(null);

  return (
   
<div className='home' style={{border: "1px solid black"}}>
    <div className="container" style={{
      border: "1px solid black", 
      width: "20%", height: "55%", 
      flexDirection: "column", 
      backgroundColor: "white"
    }}>
        <div className='settings'></div>
        <div className='name'><img src={info} alt="info" width={"25px"} /><p></p>{currentUser.displayName}</div>
        <div className='name'><img src={info} alt="info" width={"25px"} /><p></p>{currentUser.displayName}</div>
        <div className='name'><img src={email} alt="email" width={"25px"} /><p></p>{currentUser.email}
        </div>
      <NavLink to={"/login"} onClick={() => signOut(auth)} style={{
      
        display: "flex",
        margin: "0 auto",
        alignItems: "center",
        height: "40px",
        justifyContent: "center",
        textDecoration: "none",
        color: "white",
        borderRadius: "8px",
        border: "1px solid black",
        borderBottom: "0px",
        width: "100%",
        backgroundColor: "#3e3c61"
      }}>Выйти</NavLink>
   
     
    </div>
      
    
        </div>
 
  )
}

export default Settings;