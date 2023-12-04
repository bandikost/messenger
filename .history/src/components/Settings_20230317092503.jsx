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


const Settings = () => {
  return (
   
<div className='home'>
    <div className="container">
      <NavLink to={"/login"} onClick={() => signOut(auth)}>выйти</NavLink>
     
    </div>
      
    
        </div>
 
  )
}

export default Settings;