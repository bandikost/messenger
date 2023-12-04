import React from 'react'
import Home from '../pages/Home';
import Chat from './Chat';
import Chats from './Chats';
import Input from './Input';
import Message from './Message';
import  Navbar  from './Navbar';
import Search from './Search';
import Sidebar from './Sidebar';
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import settings from "../images/settings.png"
import { NavLink } from 'react-router-dom';



const Settings = () => {
  return (
   
<div className='home' style={{border: "1px solid black"}}>
    <div className="container" style={{border: "1px solid black", width: "30%", height: "55%", flexDirection: "column-reverse", backgroundColor: "#ddddf7"}}>
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
        backgroundColor: "#a7bcff"
      }}>Выйти</NavLink>
     
    </div>
      
    
        </div>
 
  )
}

export default Settings;