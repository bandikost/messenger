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
    <div className="container" style={{margin: "0px auto 0px"}}>
      <NavLink to={"/login"} onClick={() => signOut(auth)}>выйти</NavLink>
     
    </div>
      
    
        </div>
 
  )
}

export default Settings;